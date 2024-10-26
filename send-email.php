<?php
require 'vendor/autoload.php'; // Uistite sa, že táto cesta je správna

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Načítanie konfigurácie z prostredia
$emailUser = 'podporaalbasec@gmail.com';
$emailPass = 'mhkf amie cqer ztyd';

if (!$emailUser || !$emailPass) {
    http_response_code(500);
    echo json_encode(["error" => "Email credentials are not set correctly."]);
    exit();
}

// Overenie HTTP metódy
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Access-Control-Allow-Origin: https://albasec.sk");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json");

    $input = json_decode(file_get_contents('php://input'), true);
    $name = filter_var($input['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($input['phone'], FILTER_SANITIZE_STRING);
    $message = filter_var($input['message'], FILTER_SANITIZE_STRING);

    // Validácia vstupov
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid email address"]);
        exit();
    }

    // Nastavenie parametrov pre e-mail
    $subject = "Nová správa od " . $name;
    $emailContent = "Nová správa od: $name\n\n";
    $emailContent .= "Email: $email\n";
    $emailContent .= $phone ? "Telefónne číslo: $phone\n\n" : "";
    $emailContent .= "Správa:\n$message";

    // Vytvorenie nového e-mailu
    $mail = new PHPMailer(true);
    try {
        // Nastavenie servera
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $emailUser;
        $mail->Password = $emailPass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Nastavenie odosielateľa a príjemcu
        $mail->setFrom($emailUser, 'Your Name'); // Zmeňte 'Your Name' na váš názov
        $mail->addAddress($emailUser); // Načítanie na váš e-mail
        $mail->addReplyTo($email, $name); // Odpoveď na e-mail

        // Nastavenie predmetu a obsahu
        $mail->Subject = $subject;
        $mail->Body = $emailContent;

        // Odoslanie e-mailu
        $mail->send();
        http_response_code(200);
        echo json_encode(["message" => "Email sent successfully"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Error sending email: " . $mail->ErrorInfo]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
