<!-- Choose Actions: Pick Songs, Range Test-->
<div id="cover">
<!-- Welcome Paragraph? --> 
		<div class="mCenter">
		<h3>Welcome to Campfire</h3>
		
					<!-- Go To Choose Songs --> 
					<button onClick="clearDiv()">Pick Some Music</button>
					
					<!-- View chosen Songs --> 
					<h3>Your Songs:</h3>
					<?php
					//to run PHP script on submit
					if(isset($_POST['submit'])){
						if(!empty($_POST['testing1'])){					
						// Loop to store and display values of individual checked checkbox.
						foreach($_POST['testing1'] as $selected){
							echo "<li> $selected </li>";
							}
							}
							}
							?>
					<!-- Cancel/Leaving --> 
					<form method ="post" action="#">
					<h4>Still Listening?</h4>
					<input type="submit" name="clear" value="Not Anymore">
					</form>
		</div>			
										
</div>

<div class ="mContent" id="mCont">
	


	

	

	<!-- Choose Songs -->

					<form method ="post" action="#">
					<h3>Choose your favourite Songs</h3>
					<?php foreach ($result as $row) : ?>
						<p>
						
						
						<label><input type="checkbox" name="testing1[]" id="testing1" value ="<?php echo escape($row["songname"]);?>">	
						"<?php echo escape($row["songname"]);?>" by <?php echo escape($row["artist"]);?></label>
						
						</p>  
					<?php endforeach; ?>
					
					<input type="submit" name="submit" value="Submit">
					
				</form>
		
		
			
				<div class="mCenter">
					
					
					<button onClick="coverDiv()">Back</button>
				
				</div>
				
				
				
				
			
</div>


<script>
//remove div on button press
	function clearDiv(){
		//document.getElementById("cover").style.animation = "drop 1s ease-in-out";
		document.getElementById("cover").style.display = "none";
		
		//display mCont pretty
		document.getElementById("mCont").style.display="block";
	}
	
	function coverDiv(){
		//remove mCont
				document.getElementById("cover").style.display = "block";
				
				document.getElementById("mCont").style.display="none";
		
		
		
		
		

		
		
		
		
		
		
	}

</script>