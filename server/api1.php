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
				else {
					return $data;
				}
    }
    private function formatJson($jsonData){
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
			if(mysql_num_rows($result) > 0) {
          $rows =  mysql_fetch_array($result,MYSQL_ASSOC);
          $apiKeyDB = $rows['api_key'];
          $flag = true;
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
				public function sendResponse($statusCode,$status,$message = null ,$data = null){
					$response = array();
					$response['statusCode'] = $statusCode;
					$response['status'] = $status;
					$response['message'] = $message;
					$response['data'] = $data;
					$this->response($this->json($response), 200);
        }
        public function clearArray($arr){
            unset($arr);
            $arr = array();
            return $arr;
        }
        public function getUsers(){
        	  $sql = "SELECT * FROM ".self::usersTable;
       			$rows = $this->executeGenericDQLQuery($sql);
						$users = array();
						for($i=0;$i<sizeof($rows);$i++)
	    			{
	    				$users[$i]['id'] = $rows[$i]['id'];
	    				$users[$i]['user_type'] = $rows[$i]['user_type'];
	    				$users[$i]['user_name'] = $rows[$i]['user_name'];
	    				$users[$i]['mobile'] = $rows[$i]['mobile'];
	    				$users[$i]['email'] = $rows[$i]['email'];
	    				$users[$i]['first_name'] = $rows[$i]['first_name'];
	    				$users[$i]['last_name'] = $rows[$i]['last_name'];
	    				$users[$i]['token'] = $rows[$i]['token'];
	    				$users[$i]['status'] = $rows[$i]['status'];
	    			}
    				$this->sendResponse(200,"success","",$users);
        }
				public function getUserById(){
        	  $sql = "SELECT * FROM ".self::usersTable;
        	  $sql .= " where id=".$this->_request['id'];
       			$rows = $this->executeGenericDQLQuery($sql);
						$user = array();
    				$user['id'] = $rows[0]['id'];
    				$user['user_type'] = $rows[0]['user_type'];
    				$user['user_name'] = $rows[0]['user_name'];
    				$user['mobile'] = $rows[0]['mobile'];
    				$user['email'] = $rows[0]['email'];
    				$user['first_name'] = $rows[0]['first_name'];
    				$user['last_name'] = $rows[0]['last_name'];
    				$user['token'] = $rows[0]['token'];
    				$user['status'] = $rows[0]['status'];
  					$this->sendResponse(200,"success","",$user);
        }
				public function register(){
					$user_data = $this->_request['user_data'];
					$user_name = $user_data['user_name'];
					$password = md5($user_data['password']);
					$email = $user_data['email'];
					$first_name = $user_data['first_name'];
					$last_name = $user_data['last_name'];
					$mobile = $user_data['mobile'];
					$user_type = $user_data['user_type'];
					$status = 0; //0 for inactive and 1 for active
					$sql = "INSERT INTO ".self::usersTable."(user_type, user_name, mobile, password, email, first_name, last_name,status) VALUES ('$user_type','$user_name','$mobile','$password','$email','$first_name','$last_name','$status')";
					$rows = $this->executeGenericDMLQuery($sql);
					$this->sendResponse(200,"success","Successfully added");
        }
				public function login() {
					if(!isset($this->_request['user_name']) || !isset($this->_request['password']))
						$this->sendResponse(202,"failed","validation Error","Invalid user name or password");
					$user_name = $this->_request['user_name'];
					$password = md5($this->_request['password']);
					$sql = "select * from ".self::usersTable." where user_name = '$user_name' and password = '$password' limit 1";
					$rows = $this->executeGenericDQLQuery($sql);
					if(sizeof($rows))
						$this->sendResponse(200,"success","ok");
					else {
							$this->sendResponse(201,"failure","fail");
					}
        }
	}

	$api = new API;
	$api->processApi();
?>
