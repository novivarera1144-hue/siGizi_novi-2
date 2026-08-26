<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'value'];

    /**
     * Get a setting by key with fallback default value.
     */
    public static function get(string $key, $default = null)
    {
        try {
            $setting = static::where('key', $key)->first();
            if (!$setting) {
                return $default;
            }
            $val = $setting->value;
            if ($val === '1' || $val === 'true') return true;
            if ($val === '0' || $val === 'false') return false;
            return $val;
        } catch (\Exception $e) {
            return $default;
        }
    }

    /**
     * Set/update a setting value.
     */
    public static function set(string $key, $value)
    {
        $stringValue = is_bool($value) ? ($value ? '1' : '0') : (string) $value;
        return static::updateOrCreate(
            ['key' => $key],
            ['value' => $stringValue]
        );
    }

    /**
     * Get all settings as a key-value associative array.
     */
    public static function getAll(): array
    {
        $defaults = [
            'app_name' => 'siGizi',
            'admin_email' => 'noreply@sigizi.com',
            'maintenance_mode' => false,
            'enable_2fa' => true,
            'session_timeout' => 15,
        ];

        try {
            $settings = static::all()->pluck('value', 'key')->toArray();
            $formatted = [];
            foreach ($settings as $k => $v) {
                if ($v === '1' || $v === 'true') {
                    $formatted[$k] = true;
                } elseif ($v === '0' || $v === 'false') {
                    $formatted[$k] = false;
                } elseif (is_numeric($v)) {
                    $formatted[$k] = (int) $v;
                } else {
                    $formatted[$k] = $v;
                }
            }
            return array_merge($defaults, $formatted);
        } catch (\Exception $e) {
            return $defaults;
        }
    }
}
