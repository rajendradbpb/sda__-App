<?php
header('Access-Control-Allow-Origin: *');

	require_once("Rest.inc.php");
	//require_once('generatePDF.php');
	//include('simple_html_dom.php');
	//require_once('CaptureService.php');
	//require_once('config/config.php');
	//require 'QueryPath/qp.php';

	class API extends REST {

		public $data = "";

		const DB_SERVER = "localhost";
		const DB_USER = "root";
		const DB_PASSWORD = "";
	  const DB = "rdadb";
		// adding table names
		const usersTable = "users";



		private $db = NULL;
		private $proxy = NULL;
		private $storeApiLogin = false;

		public function __construct(){
			parent::__construct();
			$this->dbConnect();
		}

		private function dbConnect(){

			$this->db = mysql_connect(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD);
			if($this->db)
                mysql_select_db(self::DB, $this->db) or die('ERRROR:'.mysql_error());
			else
				echo "db not exists";
		}

		public function processApi(){

			$func='';
			if(isset($_REQUEST['service']))
				$func = strtolower(trim(str_replace("/", "", $_REQUEST['service'])));
			else if(isset($_REQUEST['reqmethod']))
				$func = strtolower(trim(str_replace("/", "", $_REQUEST['reqmethod'])));

			if($func){

				//if(function_exists($func))
				if (method_exists($this, $func)) {
					$this->$func();
				} else{
					$this->log('invalid service:'.$func, true, 'log_invalid.txt');
					$this->response('invalid service', 406);
				}
			}
			else
				echo "invalid function";
		}
		public function json($data){
                if(is_array($data))
                {
                        $formatted= json_encode($data);
                        return $this->formatJson($formatted);
                }
        }
        private function formatJson($jsonData)
        {
            $formatted = $jsonData;
            $formatted = str_replace('"{', '{', $formatted);
            $formatted = str_replace('}"', '}', $formatted);

            $formatted = str_replace('\\', '', $formatted);


            return $formatted;
        }
		private function isValidCall($apiKey)
		{
			$flag=false;
			$apiKey = mysql_real_escape_string($apiKey);

			$sql="SELECT api_key  FROM ".self::TABLE_API_DATA." WHERE api_key ='$apiKey' ";
			$result = mysql_query($sql, $this->db);
			if(mysql_num_rows($result) > 0)
                        {
                            $rows =  mysql_fetch_array($result,MYSQL_ASSOC);
                            $apiKeyDB=$rows['api_key'];
                            $flag =true;
			}
			return $flag;
		}

		/*
		START  :: 28.2.15 :: Rajendra kumar sahoo
		*/
        public function executeGenericDQLQuery($query){
                try{
                    if(!$this->db)
                    {
                        $this->db = mysql_connect(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD);
                    }
                    $result = mysql_query($query, $this->db);
                    /* if(mysqli_errno($con) != 0){
                        throw new Exception("Error   :".mysqli_errno($con)."   :  ".mysqli_error($con));
                    } */

                    $rows = array();
                    while($row = mysql_fetch_array($result)){
                        array_push($rows,$row);
                    }
                    //mysqli_close($con);
                    return $rows;

                }
                catch(Exception $e){
                    $response = array();
                    $response['status'] = false;
                    $response['message'] = $e->getMessage();
                    $this->response($this->json($response), 200);
                }

            }
            public function executeGenericDMLQuery($query){
                try{
                    $result = mysql_query($query, $this->db);
                    if(mysql_errno($this->db) != 0){
                        throw new Exception("Error   :".mysql_errno($this->db)."   :  ".mysql_error($this->db));
                    }

                }
                catch(Exception $e){
                    $response = array();
                    $response['status'] = false;
                    $response['message'] = $e->getMessage();
                    //echo json_encode($response);
                    $this->response($this->json($response), 200);
                }
            }
            public function executeGenericInsertQuery($query){
                try{
                    $result = mysql_query($query, $this->db);
                    if(mysql_errno($this->db) != 0){
                        throw new Exception("Error   :".mysql_errno($this->db)."   :  ".mysql_error($this->db));
                    }
                    return mysql_insert_id($this->db);
                }
                catch(Exception $e){
                    $response = array();
                    $response['status'] = false;
                    $response['message'] = $e->getMessage();
                    //echo json_encode($response);
                    $this->response($this->json($response), 200);
                }
            }
						public function sendResponse($statusCode,$status,$message = null ,$data = null)
		        {
							$response = array();
							$response['statusCode'] = $statusCode;
							$response['status'] = $status;
							$response['message'] = $message || null;
							$response['data'] = $data || null;
							$this->response($this->json($response), 200);
		        }
            public function clearArray($arr){
                unset($arr);
                $arr = array();
                return $arr;
            }
        public function getUsers()
        {
        	   $sql="SELECT * FROM ".self::usersTable;
       			$rows = $this->executeGenericDQLQuery($sql);
    				$this->response($this->json($rows), 200);
        }
				public function register()
        {
					$user_name = $this->_request['user_name'];
					$password = md5($this->_request['password']);
					$email = $this->_request['email'];
					$first_name = $this->_request['first_name'];
					$last_name = $this->_request['last_name'];
					$sql = "INSERT INTO ".self::usersTable."(user_name, password, email, first_name, last_name) VALUES ('$first_name','$password','$email','$first_name','$last_name')";
					$this->executeGenericDMLQuery($sql);
        }
				public function login()
        {
					
					if(!isset($this->_request['user_name']) || !isset($this->_request['password']))
						$this->sendResponse(202,"failed","validation Error","Invalid user name or password");
					$user_name = $this->_request['user_name'];
					$password = md5($this->_request['password']);
					$sql = "select * from ".self::usersTable." where user_name = '$user_name' and password = '$password' limit 1";
					// echo $sql;
					$rows = $this->executeGenericDQLQuery($sql);
					if(sizeof($rows))
						$this->sendResponse(200,"success","ok");
					else {
							$this->sendResponse(200,"failure","fail");
					}
        }
        public function postCountry()
        {
          $countryData = $this->_request['countryData'];
          // echo $countryData;
          $sql = "select * from country where CountryName = '".$countryData['countryName']."'";
          $rows = $this->executeGenericDQLQuery($sql);
          // print_r($rows);
          $response = array();
          if(sizeof($rows) > 0)
          {
            $response['status'] = "success" ;
            $response['data'] = "country already exists";
          }
          else
          {
               $sql = "insert into country(CountryName,ISDCode,Currency) values('".$countryData['countryName']."' , '".$countryData['isdCode']."' , '".$countryData['currency']."')";

               $rows = $this->executeGenericDMLQuery($sql);
               $response['status'] = "success" ;
               $response['data'] = "country enter successful";
          }
            $this->response($this->json($response), 200);
        }


        /*codes for emergency contact ends*/

	}

	$api = new API;
	$api->processApi();
?>
