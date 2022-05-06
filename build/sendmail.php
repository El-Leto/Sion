<!-- <?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  //от кого
  //$mail->setFrom('sion@liftsouz.ru', 'Заявка');
  $mail->setFrom('lizok-kom@rambler.ru', 'Заявка');
  //кому
  //$mail->addAddress('sion@liftsouz.ru');
  $mail->addAddress('elleto.life@gmail.com');
  $mail->Subject = 'Заявка с сайта';

  $body = '<h1>Новая заявка на консультацию!</h1>';

  if(trim(!empty($_POST['name']))){
    $body.='<p><strong>ФИО:</strong> '.$_POST['name'].'</p>';
  }
  if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
  }
  if(trim(!empty($_POST['company']))){
    $body.='<p><strong>Компания:</strong> '.$_POST['company'].'</p>';
  }

  $mail->Body = $body;

  if (!$mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?> -->

<?php
$name = $_POST['name'];
$phone = $_POST['tel'];
$email = $_POST['email'];
$comment = htmlentities($_POST["comment"]);
$header = array(
  "MIME-Version: 1.0",
  "Content-Type: text/html;charset=utf-8"
);

$to  = "<elleto.life@gmail.com>, " ; 
$to .= "<info@oldoc.ru>"; 

$response = $_POST["g-recaptcha-response"];
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
  'secret' => '6LehJ4UfAAAAACKpQNVSE1RspTlO_UmUqiO-r7JG',
  'response' => $_POST["g-recaptcha-response"]
];
$options = [
  'http' => [
    'method' => 'POST',
    'content' => http_build_query($data)
  ]
];
$context  = stream_context_create($options);
$verify = file_get_contents($url, false, $context);
$captcha_success=json_decode($verify);
if ($captcha_success->success==false) {
  echo "Ты робот!";
} else if ($captcha_success->success==true) {
  mail($to, "Заявка с сайта", "Имя: ".$name."
  Телефон: ".$phone."
  E-mail: ".$email."
  Текст сообщения: ".$comment,implode("\r\n", $header));

  $redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'index.html';
  header("Location: $redirect");
  echo "сообщение успешно отправлено";
}
exit();
?>