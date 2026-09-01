<?php

namespace App\Exceptions;

use Exception;

class GeminiApiException extends Exception
{
    /**
     * The raw response body from the Gemini API (if available).
     */
    protected string $responseBody;

    public function __construct(string $message = '', int $code = 0, ?Exception $previous = null, string $responseBody = '')
    {
        parent::__construct($message, $code, $previous);
        $this->responseBody = $responseBody;
    }

    /**
     * Get the raw API response body for debugging.
     */
    public function getResponseBody(): string
    {
        return $this->responseBody;
    }
}
