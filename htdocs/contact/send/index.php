<?php
header('Cache-Control: no-store');
header('Pragma: no-cache');

/* don’t let your response headers talk too loudly */
header('X-Powered-By: Kleiderordnung');

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	/* AJAX request from modern browser: at this point, there isn't anything to download anymore */
	header('Content-Type: application/json');
	header('Connection: close');
	echo '{1}';
} else {
  /* fallback for plain FORM SUBMIT */
	header('Content-Type: text/html');
	header('Refresh: 5; url=http://www.kleiderordnung-duesseldorf.de/');
  echo '<!DOCTYPE HTML><html lang=de><head><meta charset="utf-8"><title>Kleiderordnung - Ihr roter Faden zum eigenen Stil</title></head>';
  echo '<body><h1>Vielen Dank f&uuml;r Ihre Nachricht!</h1>';
  echo '<a href="http://www.kleiderordnung-duesseldorf.de/">Zur&uuml;ck zur Homepage Kleiderordnung-Duesseldorf.de</a>';
  echo '</body></html>';
}

$post_name  = filter_var($_REQUEST['Name'],      FILTER_SANITIZE_STRING);
$post_email = filter_var($_REQUEST['E-Mail'],    FILTER_SANITIZE_EMAIL);
$post_tel   = filter_var($_REQUEST['Telefon'],   FILTER_SANITIZE_STRING);
$post_msg   = filter_var($_REQUEST['Nachricht'], FILTER_SANITIZE_STRING);
$post_ref   = filter_var($_REQUEST['Referrer'],  FILTER_SANITIZE_STRING);
$spamtrap   = filter_var($_REQUEST['recipient'], FILTER_SANITIZE_STRING);

$to      = 'mklein@meine-modeberaterin.de';';
$subject = 'Anfrage ueber kleiderordnung-duesseldorf.de';

/* require spamtrap 'captcha' be empty, require msg not empty         */
/* on error only send error msg to webmaster, otherwise send to owner */
if (!empty($spamtrap) || empty($post_msg) || 'POST'!=$_SERVER['REQUEST_METHOD'] ){
  $to      = 'spamtrap@open-mind-culture.org';
  $subject.= ' [Spamverdacht]';
}

$message = 'Name: ' .    $post_name .  "\r\n".
           'E-Mail: ' .  $post_email . "\r\n".
           'Telefon: ' . $post_tel .   "\r\n\r\n".
           $post_msg . "\r\n".
           "\r\n";
$headers = 'MIME-Version: 1.0' . "\r\n".
           'Content-Type: text/plain; charset=UTF-8' . "\r\n".
           'From: Kleiderordnung-Kontaktformular<mklein@kleiderordnung-duesseldorf.de>' . "\r\n" .
           'Reply-To: ' . $post_email . "\r\n" .
           'Bcc: spamtrap@open-mind-culture.org'. "\r\n".
           'Remote-Address: ' .   $_SERVER['REMOTE_ADDR'] . "\r\n".
           'User-Agent: ' .       $_SERVER['HTTP_USER_AGENT'] . "\r\n".
           'Referrer: ' .         $post_ref . "\r\n".
           'X-Requested-With: ' . $_SERVER['HTTP_X_REQUESTED_WITH'] . "\r\n".
           'X-Request-Method:'  . $_SERVER['REQUEST_METHOD'] . "\r\n".
           'X-Mailer: Kleiderordnung';

mail($to, $subject, $message, $headers);

?>
