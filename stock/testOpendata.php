<?php
// echo 1;
$handle = curl_init();
// echo 2;
if (FALSE === $handle)
   throw new Exception('failed to initialize');
$target = $_REQUEST['text'];
curl_setopt($handle, CURLOPT_URL,'https://quality.data.gov.tw/dq_download_json.php?nid=11549&md5_url=bb878d47ffbe7b83bfc1b41d0b24946e');
curl_setopt($handle, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($handle,CURLOPT_HTTPHEADER,array('X-HTTP-Method-Override: GET'));
$response = curl_exec($handle);

$Arr = json_decode($response);

function array_to_json($array){
    foreach($array as $key =>$value){
        if(is_string($key)|| is_string($value)){
            $new_array[urlencode($key)] = urlencode($value);
        }
    }
    return urldecode(json_encode($new_array));
}
echo urldecode(json_encode($Arr));


?>