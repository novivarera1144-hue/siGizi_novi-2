<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TestimonialController extends Controller
{
    /**
     * Store a newly created testimonial.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'occupation' => ['required', 'string', 'max:100', 'min:3'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:1000', 'min:5'],
        ], [
            'occupation.required' => 'Pekerjaan atau status wajib diisi.',
            'occupation.min' => 'Pekerjaan atau status minimal 3 karakter.',
            'occupation.max' => 'Pekerjaan atau status maksimal 100 karakter.',
            'rating.required' => 'Rating bintang wajib dipilih.',
            'rating.integer' => 'Rating harus bernilai angka.',
            'rating.min' => 'Rating minimal 1 bintang.',
            'rating.max' => 'Rating maksimal 5 bintang.',
            'comment.required' => 'Isi ulasan wajib ditulis.',
            'comment.min' => 'Ulasan minimal berisi 5 karakter.',
            'comment.max' => 'Ulasan maksimal berisi 1000 karakter.',
        ]);

        Testimonial::create([
            'user_id' => $request->user()->id,
            'occupation' => $validated['occupation'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'is_approved' => false,
        ]);

        return Redirect::back()->with('success', 'Ulasan Anda berhasil dikirim dan menunggu persetujuan admin.');
    }

    /**
     * Update the approved status of a testimonial.
     */
    public function updateStatus(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $validated = $request->validate([
            'is_approved' => ['required', 'boolean'],
        ]);

        $testimonial->update([
            'is_approved' => $validated['is_approved'],
        ]);

        $statusMessage = $testimonial->is_approved 
            ? 'Testimoni berhasil ditampilkan di halaman utama.' 
            : 'Testimoni berhasil disembunyikan.';

        return Redirect::back()->with('success', $statusMessage);
    }
}
