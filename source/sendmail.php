<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  //от кого
  //$mail->setForm('sion@liftsouz.ru', 'Заявка');
  $mail->setForm('lizok-kom@rambler.ru', 'Заявка');
  //кому
  //$mail->addAddress('sion@liftsouz.ru');
  $mail->addAddress('elleto.life@gmail.com');
  $mail->Subject = 'Заявка с сайта';

  $body = '<h1>Новая заявка на консультацию!</h1>';

  if(trim(!empty($POST['name']))){
    $body.='<p><strong>ФИО:</strong> '.$_POST['name'].'</p>';
  }
  if(trim(!empty($POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
  }
  if(trim(!empty($POST['company']))){
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
?>