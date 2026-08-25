<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSetting;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class KelolaTampilanController extends Controller
{
    /**
     * Display the Kelola Tampilan page with all required data.
     */
    public function index(): Response
    {
        $settings     = HomeSetting::getSettings();
        $testimonials = Testimonial::with('user:id,name,photo,avatar')
            ->latest()
            ->get()
            ->map(function ($t) {
                return [
                    'id'         => $t->id,
                    'name'       => $t->user?->name ?? 'Anonim',
                    'role'       => $t->role,
                    'rating'     => $t->rating,
                    'comment'    => $t->comment,
                    'is_visible' => $t->is_visible,
                    'created_at' => $t->created_at?->toDateTimeString(),
                ];
            });

        $totalReviews   = $testimonials->count();
        $activeReviews  = $testimonials->where('is_visible', true)->count();
        $hiddenReviews  = $testimonials->where('is_visible', false)->count();
        $averageRating  = $totalReviews > 0
            ? round($testimonials->avg('rating'), 1)
            : 0;

        return Inertia::render('Admin/KelolaTampilan', [
            'settings'     => $settings,
            'testimonials' => $testimonials,
            'stats'        => [
                'total_reviews'  => $totalReviews,
                'active_reviews' => $activeReviews,
                'hidden_reviews' => $hiddenReviews,
                'average_rating' => number_format($averageRating, 1),
            ],
        ]);
    }

    /**
     * Update the Hero section (headline + image).
     */
    public function updateHero(Request $request): RedirectResponse
    {
        $request->validate([
            'hero_headline' => ['required', 'string', 'max:255'],
            'hero_image'    => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:2048'],
        ], [
            'hero_headline.required' => 'Headline homepage wajib diisi.',
            'hero_headline.max'      => 'Headline maksimal 255 karakter.',
            'hero_image.image'       => 'File harus berupa gambar.',
            'hero_image.mimes'       => 'Format gambar yang diterima: jpg, jpeg, png, webp, gif.',
            'hero_image.max'         => 'Ukuran gambar maksimal 2MB.',
        ]);

        $settings = HomeSetting::getSettings();

        $data = ['hero_headline' => $request->hero_headline];

        if ($request->boolean('delete_image')) {
            if ($settings->hero_image && Storage::disk('public')->exists($settings->hero_image)) {
                Storage::disk('public')->delete($settings->hero_image);
            }
            $data['hero_image'] = null;
        } elseif ($request->hasFile('hero_image')) {
            // Hapus file lama jika ada
            if ($settings->hero_image && Storage::disk('public')->exists($settings->hero_image)) {
                Storage::disk('public')->delete($settings->hero_image);
            }
            $data['hero_image'] = $request->file('hero_image')->store('hero-images', 'public');
        }

        $settings->update($data);

        return redirect()->back()->with('success', 'Hero section berhasil diperbarui!');
    }

    /**
     * Update the About Us section.
     */
    public function updateAbout(Request $request): RedirectResponse
    {
        $request->validate([
            'about_short_description' => ['required', 'string', 'max:1000'],
            'about_background'        => ['required', 'string', 'max:2000'],
            'about_goal'              => ['required', 'string', 'max:2000'],
            'about_benefits'          => ['nullable', 'array'],
            'about_benefits.*'        => ['string', 'max:300'],
        ], [
            'about_short_description.required' => 'Deskripsi singkat wajib diisi.',
            'about_background.required'        => 'Latar belakang wajib diisi.',
            'about_goal.required'              => 'Tujuan wajib diisi.',
        ]);

        $settings = HomeSetting::getSettings();

        // Filter out empty benefit entries
        $benefits = collect($request->about_benefits ?? [])
            ->filter(fn($b) => filled($b))
            ->values()
            ->toArray();

        $settings->update([
            'about_short_description' => $request->about_short_description,
            'about_background'        => $request->about_background,
            'about_goal'              => $request->about_goal,
            'about_benefits'          => $benefits,
        ]);

        return redirect()->back()->with('success', 'Halaman Tentang Kami berhasil diperbarui!');
    }

    /**
     * Toggle the is_visible status of a testimonial.
     */
    public function toggleTestimonial(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update([
            'is_visible' => ! $testimonial->is_visible,
        ]);

        $message = $testimonial->is_visible
            ? 'Testimoni berhasil ditampilkan di halaman utama.'
            : 'Testimoni berhasil disembunyikan.';

        return redirect()->back()->with('success', $message);
    }
}
