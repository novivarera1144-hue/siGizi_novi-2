<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SupabaseService
{
    protected string $url;
    protected string $key;

    public function __construct()
    {
        $this->url = rtrim(config('services.supabase.url', env('SUPABASE_URL', 'https://lfmmomyvvwrmdnutobqr.supabase.co')), '/');
        $this->key = config('services.supabase.key', env('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbW1vbXl2dndybWRudXRvYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MDI4NjEsImV4cCI6MjEwMDM3ODg2MX0.89oNLB97h8JO-UwDt1zBa54P1TIB85sa9Nww0Tf64TA'));
    }

    /**
     * Get default headers for REST API request
     */
    protected function headers(array $extra = []): array
    {
        return array_merge([
            'apikey' => $this->key,
            'Authorization' => 'Bearer ' . $this->key,
            'Content-Type' => 'application/json',
            'Prefer' => 'return=representation',
        ], $extra);
    }

    /**
     * Fetch records from a Supabase table
     *
     * @param string $table
     * @param array $queryParams e.g. ['select' => '*', 'order' => 'created_at.desc', 'limit' => 10, 'user_id' => 'eq.1']
     * @return array
     */
    public function get(string $table, array $queryParams = []): array
    {
        try {
            $endpoint = $this->url . '/rest/v1/' . $table;
            $response = Http::withHeaders($this->headers())
                ->get($endpoint, $queryParams);

            if ($response->successful()) {
                return $response->json() ?? [];
            }

            Log::error("Supabase GET error [$table]: " . $response->body());
            return [];
        } catch (\Exception $e) {
            Log::error("Supabase GET Exception [$table]: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Get a single record by primary key (id)
     */
    public function find(string $table, mixed $id): ?array
    {
        $records = $this->get($table, ['id' => 'eq.' . $id, 'limit' => 1]);
        return $records[0] ?? null;
    }

    /**
     * Insert one or multiple records into a table
     */
    public function insert(string $table, array $data): ?array
    {
        try {
            $endpoint = $this->url . '/rest/v1/' . $table;
            $response = Http::withHeaders($this->headers())
                ->post($endpoint, $data);

            if ($response->successful()) {
                $result = $response->json();
                return is_array($result) && count($result) > 0 ? $result[0] : $result;
            }

            Log::error("Supabase INSERT error [$table]: " . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error("Supabase INSERT Exception [$table]: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Update record(s) matching a specific column condition
     */
    public function update(string $table, mixed $id, array $data): bool
    {
        try {
            $endpoint = $this->url . '/rest/v1/' . $table . '?id=eq.' . $id;
            $response = Http::withHeaders($this->headers())
                ->patch($endpoint, $data);

            return $response->successful();
        } catch (\Exception $e) {
            Log::error("Supabase UPDATE Exception [$table]: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Delete record(s) matching an id
     */
    public function delete(string $table, mixed $id): bool
    {
        try {
            $endpoint = $this->url . '/rest/v1/' . $table . '?id=eq.' . $id;
            $response = Http::withHeaders($this->headers(['Prefer' => 'return=minimal']))
                ->delete($endpoint);

            return $response->successful();
        } catch (\Exception $e) {
            Log::error("Supabase DELETE Exception [$table]: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Count total rows in a table matching criteria
     */
    public function count(string $table, array $queryParams = []): int
    {
        try {
            $endpoint = $this->url . '/rest/v1/' . $table;
            $params = array_merge($queryParams, ['select' => 'id']);
            $headers = array_merge($this->headers(), ['Prefer' => 'count=exact']);

            $response = Http::withHeaders($headers)->get($endpoint, $params);
            
            $contentRange = $response->header('Content-Range');
            if ($contentRange && str_contains($contentRange, '/')) {
                $total = explode('/', $contentRange)[1];
                return intval($total);
            }

            return count($response->json() ?? []);
        } catch (\Exception $e) {
            Log::error("Supabase COUNT Exception [$table]: " . $e->getMessage());
            return 0;
        }
    }

    /**
     * Upload image to Supabase Storage bucket or return public URL
     */
    public function uploadStorageFile(string $bucket, string $filePath, string $contents, string $mimeType = 'image/png'): ?string
    {
        try {
            $endpoint = $this->url . '/storage/v1/object/' . $bucket . '/' . ltrim($filePath, '/');
            $response = Http::withHeaders([
                'apikey' => $this->key,
                'Authorization' => 'Bearer ' . $this->key,
                'Content-Type' => $mimeType,
                'x-upsert' => 'true'
            ])->withBody($contents, $mimeType)->post($endpoint);

            if ($response->successful()) {
                return $this->url . '/storage/v1/object/public/' . $bucket . '/' . ltrim($filePath, '/');
            }
            
            Log::warning("Supabase storage upload failed: " . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error("Supabase storage exception: " . $e->getMessage());
            return null;
        }
    }
}
