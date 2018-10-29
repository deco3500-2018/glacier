<!-- Referencing Note: 

	This file is where fullpage.js is used.
	documentation: https://github.com/alvarotrigo/fullPage.js/#fullpagejs

	For fullpage.js to work, 
	 - A 'fullpage' div must be part of the class='section' 
	 - the css sheet "fullpage.css" must be referenced.
	 - the js file "fullpage.js" must be referenced. 
	 - and the following js must be used:
	 
		 new fullpage('#fullpage', {
				autoScrolling:true,
				scrollHorizontally: false,
				licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
			});

	-->


<?php

/**
 * display selected songs 
 */
require "../config.php";
require "../common.php";
try {	
		

		$connection = new PDO($dsn, $username, $password, $options);

		$sql = "SELECT * FROM `songs`
					WHERE selected = 1
					ORDER by RAND()
					";

		$selected = $_POST['selected'];

		$statement = $connection->prepare($sql);
		$statement->bindParam(':selected', $selected, PDO::PARAM_STR);
		$statement->execute();

		$result = $statement->fetchAll();
	} catch(PDOException $error) {
		echo $sql . "<br>" . $error->getMessage();
	}
	
//select user

try {	
		

		$connection = new PDO($dsn, $username, $password, $options);

		$sql = "SELECT DISTINCT color, user FROM `songs`
					WHERE selected = 1
					ORDER BY RAND()
					";

		$selectedU = $_POST['selected'];

		$statement = $connection->prepare($sql);
		$statement->bindParam(':selected', $selectedU, PDO::PARAM_STR);
		$statement->execute();

		$userResults = $statement->fetchAll();
	} catch(PDOException $error) {
		echo $sql . "<br>" . $error->getMessage();
	}
	
	

	
	/**
* Update entire table, removing "selected" value (should move to template at some point. 
*/
if (isset($_POST['clear'])){
	try{
		$conn = new PDO($dsn,$username,$password,$options);
		//error mode?
		
		$sql ="UPDATE `songs` SET selected = 0 ";
		
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
	
	
/*populate
*
*/
if (isset($_POST['fill'])){
	try{
		$conn = new PDO($dsn,$username,$password,$options);
		//error mode?
		
		$sql ="UPDATE `songs` SET selected=1";
		
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


if (isset($_POST['refresh'])){
	try{
		$conn = new PDO($dsn,$username,$password,$options);
		//error mode?
		
		$sql ="SELECT * FROM`songs` WHERE selected=1";
		
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

	<form id="fixedRefresh" method="post">
		<div id="activeUsers">
		<?php  
				if ($userResults && $statement->rowCount() > 0) {?>	
					<?php foreach ($userResults as $row) { ?>
						<div class ="activeUser" style ="background-color:#<?php echo escape($row["color"]);?>;"></div>					
					<?php } ?> 
					
					<?php } else { ?>
						<blockquote><p>no one's around :(</p></blockquote>
					<?php } 
		?>

		<input type="image" src="images/flame_icon.png" name="refresh" width="40" height="40">
		</div>
	
	
	</form>
				
	
			
				
				
<div id="fullpage">

	<div class ="section"> <!--fullPage.js class -->
		<div class="maincontent">
			<h1>Campfire</h1>
			<form  method="post">
				<img id="fire" src="images/flame_icon.png" alt="fill"/>
				
	
				
			
		
			</form> 
			<br>
			<br>
			
				
				
				
			
			
		</div>
	</div>
	
	<!-- This block of code writes each song into its own fullpage section div, changing colour depending on user.-->
	<?php  
				if ($result && $statement->rowCount() > 0) { ?>								
				<?php foreach ($result as $row) { ?>
						<!-- fullPage.js class -->
						<div class ="section" style="background-color: #<?php echo escape($row["color"]);?>"> 
							<div class="audioDiv">
								<h2>"<?php echo escape($row["songname"]);?>", <?php echo escape($row["artist"]);?></h2>
								<audio id="<?php echo escape($row["id"]);?>" data-autoplay controls>
									<source src="videos/<?php echo escape($row["mp3url"]);?>" type="audio/mp3">
								</audio>
								
								
								
								
							</div>
							
						</div>	
						
						
						
					<?php } ?> 
						
				
				<?php } else { ?>
					<blockquote></p>No songs :(</p></blockquote>
				<?php } 
			?> 
		
	
	
	
	
	
	
	



</div>


<script>
	//listeners
	
	//to play or pause music: W
	document.addEventListener('keydown', function(e) {
		if (e.keyCode==39) {
			playPause();
			}
			});
	//skip backwards	
	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 37) {
			scrollUp();
			}
			});
			
	//auto slide on load : 3 seconds
	var startTime = setInterval(firstScroll, 3000);
	
	function firstScroll() {
		scrollDown();
		clearInterval(startTime);
		}
	

</script>

<script type="text/javascript" src="js/fullpage.js"></script>

<script type="text/javascript">
var currentPage;
var currentMusic;

	//references fullpage.js
	new fullpage('#fullpage', { 
		autoScrolling:true,
		scrollHorizontally: false,
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
	});

	//references fullpage.js 
	function scrollDown(){
		fullpage_api.moveSectionDown();
	}
	
	//references fullpage.js
	function scrollUp(){
		fullpage_api.moveSectionUp();
	}

	//references fullpage.js
	function getPage(){
		//store data about the current page
		currentPage = (fullpage_api.getActiveSection().item.children["0"].firstElementChild.childNodes[3].id);
		currentMusic =(document.getElementById(currentPage));
	}
	
	function playPause(){
		console.log('YOU PRESSED 39');
		getPage();
		if(currentMusic.paused){
			playMusic();
		}else{
		stopMusic();}
	}
		
	function playMusic(){
		document.getElementById(currentPage).play();
	}
	
	function stopMusic(){
		document.getElementById(currentPage).pause();
	}
	
	//references fullpage.js
	fullpage_api.setAllowScrolling(true);
</script>


<?php require "templates/footer.php"; ?>