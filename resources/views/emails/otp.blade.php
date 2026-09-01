<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kode Verifikasi OTP - siGizi</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4f9f6;
            color: #2d3748;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .wrapper {
            width: 100%;
            padding: 30px 15px;
            box-sizing: border-box;
        }
        .container {
            max-width: 540px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(31, 122, 84, 0.08);
            border: 1px solid #e2ece7;
        }
        .header {
            background-color: #1F7A54;
            padding: 32px 24px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        .header p {
            color: #ccebdc;
            margin: 6px 0 0 0;
            font-size: 13px;
            font-weight: 500;
        }
        .content {
            padding: 36px 28px;
            line-height: 1.6;
        }
        .greeting {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 14px;
            color: #1F7A54;
        }
        .message-text {
            font-size: 14px;
            color: #4a5568;
            margin-bottom: 24px;
        }
        .otp-box {
            text-align: center;
            margin: 28px 0;
            padding: 24px 16px;
            background-color: #f0f7f3;
            border-radius: 12px;
            border: 2px dashed #1F7A54;
        }
        .otp-label {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #1F7A54;
            margin-bottom: 8px;
            display: block;
        }
        .otp-code {
            font-size: 36px;
            font-weight: 900;
            letter-spacing: 8px;
            color: #1F7A54;
            font-family: 'Courier New', Courier, monospace;
        }
        .expiry-notice {
            background-color: #fffbeb;
            border: 1px solid #fef3c7;
            border-radius: 10px;
            padding: 12px 16px;
            font-size: 13px;
            color: #92400e;
            margin-bottom: 20px;
        }
        .security-warning {
            font-size: 12px;
            color: #718096;
            line-height: 1.5;
        }
        .footer {
            background-color: #f8faf9;
            padding: 20px 24px;
            text-align: center;
            font-size: 12px;
            color: #a0aec0;
            border-top: 1px solid #edf2f0;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>siGizi</h1>
                <p>Nutrisi Untuk Hidup Lebih Baik</p>
            </div>
            <div class="content">
                <div class="greeting">Halo Pengguna siGizi,</div>
                <div class="message-text">
                    Kami menerima permintaan untuk mereset kata sandi akun siGizi Anda. Gunakan kode verifikasi (OTP) 6 digit di bawah ini untuk mengonfirmasi identitas Anda:
                </div>

                <div class="otp-box">
                    <span class="otp-label">Kode Verifikasi (OTP)</span>
                    <div class="otp-code">{{ $otpCode }}</div>
                </div>

                <div class="expiry-notice">
                    ⏰ Kode OTP ini berlaku selama <strong>10 menit</strong>. Jika sudah melebihi batas waktu, Anda perlu meminta kode baru.
                </div>

                <div class="security-warning">
                    <strong>Penting:</strong> Demi keamanan akun Anda, jangan berikan kode OTP ini kepada siapa pun. Jika Anda tidak melakukan permintaan reset kata sandi, harap abaikan email ini.
                </div>
            </div>
            <div class="footer">
                &copy; {{ date('Y') }} <strong>siGizi</strong>. Hak Cipta Dilindungi Undang-Undang.
            </div>
        </div>
    </div>
</body>
</html>
