<?php

namespace App\Http\Controllers;

use App\Exceptions\GeminiApiException;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AiChatController extends Controller
{
    /**
     * Show the AI Assistant chat page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('AiAssistant');
    }

    /**
     * Handle an incoming chat message and return AI response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Services\GeminiService  $geminiService
     * @return \Illuminate\Http\JsonResponse
     */
    public function chat(Request $request, GeminiService $geminiService)
    {
        $request->validate([
            'message' => 'required|string|max:2000',
            'history' => 'sometimes|array',
            'history.*.role' => 'required_with:history|string|in:user,ai',
            'history.*.text' => 'required_with:history|string',
        ]);

        try {
            $reply = $geminiService->chat(
                $request->input('message'),
                $request->input('history', [])
            );

            return response()->json([
                'success' => true,
                'reply' => $reply,
            ]);
        } catch (GeminiApiException $e) {
            Log::error('AI Chat Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'reply' => $e->getMessage() . ' 🙏',
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            Log::error('AI Chat Unexpected Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'reply' => 'Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
