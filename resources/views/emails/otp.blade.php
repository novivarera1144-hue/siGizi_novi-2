<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kode OTP siGizi</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f7fdfa;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(31, 122, 84, 0.08);
            border: 1px solid #e1f2eb;
        }
        .header {
            background-color: #1F7A54;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .content {
            padding: 40px 30px;
            line-height: 1.6;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #1F7A54;
        }
        .otp-container {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background-color: #eff7f4;
            border-radius: 8px;
            border: 1px dashed #1F7A54;
        }
        .otp-code {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 6px;
            color: #1F7A54;
        }
        .footer {
            background-color: #f1f8f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666666;
            border-top: 1px solid #e1f2eb;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>siGizi</h1>
        </div>
        <div class="content">
            <div class="greeting">Halo,</div>
            <p>Kami menerima permintaan untuk mereset kata sandi akun siGizi Anda. Silakan gunakan kode verifikasi (OTP) berikut untuk melanjutkan proses pemulihan kata sandi Anda:</p>
            <div class="otp-container">
                <span class="otp-code">{{ $otpCode }}</span>
            </div>
            <p>Kode OTP ini berlaku selama <strong>10 menit</strong>. Jika Anda tidak merasa melakukan permintaan ini, silakan abaikan email ini.</p>
            <p>Demi keamanan akun Anda, jangan bagikan kode OTP ini kepada siapa pun.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} siGizi. Hak Cipta Dilindungi Undang-Undang.
        </div>
    </div>
</body>
</html>
