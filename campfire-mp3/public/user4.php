<?php
require "../config.php";
require "../common.php";

/** 
* loading in the song details
*/
 try {
	 $connection = new PDO($dsn, $username, $password, $options);
	 $sql = "SELECT * FROM songs
			WHERE user = 'four' ";

	$statement = $connection->prepare($sql);
	$statement->execute();

	$result = $statement->fetchAll();
	} catch(PDOException $error) {
		echo $sql . "<br>" . $error->getMessage();
	}


/**
* Store and use checked values on submit
*
*/

if(isset($_POST['submit'])){ //when 'submit' is used

			if(!empty($_POST['testing1'])){
				
				// Loop to store and display values of individual checked checkbox.
				foreach($_POST['testing1'] as $selectedsid){
					//update song's selected value 
					try {
												
						//set a value for SQL as selectedsid
						
						$connection = new PDO($dsn, $username, $password, $options);
						$sql = "UPDATE songs SET selected=1 WHERE songname='$selectedsid'";
						
						$statement = $connection->prepare($sql);
						$statement->execute();
						
						$result = $statement->fetchAll();
						} catch(PDOException $error) {
							//echo $sql . "<br>" . $error->getMessage();
						}	
				}
			}	
	}
	
	
	
	
	


/**
* Update entire table, removing "selected" value (should move to template at some point. 
*/
if (isset($_POST['clear'])){
	try{
		$conn = new PDO($dsn,$username,$password,$options);
		//error mode?
		
		$sql ="UPDATE `songs` SET selected = 0 WHERE user = 'four'";
		
		//prepare statement
		$stmt = $conn->prepare($sql);
		
		//execute
		$stmt->execute();
		
		//echo to say success

		}
		catch(PDOException $error)
		{
			echo $sql . "<br>" . $e->getMessage();
		}
		
	$conn = null;
}
  
  
	
  
?>
<?php require "templates/header.php"; ?>

<div class ="mobile" id="u4"> 
		<div class ="mHeader">
			<img src="images/flame_icon.png"><h2>User Four</h2>
		</div>
		
		<?php require "templates/mobileContent2.php" ?>


	



</div>
<?php require "templates/footer.php"; ?>