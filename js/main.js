
const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

// Setup database connection
let db = firebase.firestore();
let fightersRef = db.collection("Fighters");

// Fetch data from database
fightersRef.get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
        console.log(doc.data());
        
    });
})

// Load Data from Database
    function LoadData(){
        fighterRef.get().then((querySnapshot) => {
            LoadListDataData(querySnapshot);
         });
     }

db.collection("Fighters").onSnapshot(function(snapShot) {
    LoadListData(snapShot);
});

// Create unordered list
function LoadListData(querySnapshot){
    var fighterInfo='';
    querySnapshot.forEach(function(doc) {
       var document = doc.data();
        
        fighterInfo +='<ul>';
        fighterInfo +='<h4 class="name">' + document.name + '</h4>';
        fighterInfo +='<li class="height">' + document.height + '</li>';
        fighterInfo +='<li class="weight">' + document.weight + '</li>';
        fighterInfo +='<li class="occupation">' + document.occupation + '</li>';
        fighterInfo +='<button class="editFighterBtn">' + "Edit Fighter" + '</button>';
        fighterInfo +='<button class="deleteFighterBtn">' + "Remove Fighter" + '</button>';
        fighterInfo +='</ul>';
        
    });
    
    $('div.fighterList').html(fighterInfo);    
}
    
    
    // Add New Fighter
    document.getElementById("createNewFighterBtn").addEventListener("click", createNewFighterForm);
    
    function createNewFighterForm() {
        document.getElementById('name').value = '';
        document.getElementById('height').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('occupation').value = '';
      
        document.getElementById("createNewFighterBtn").style.display = "none";
        document.getElementById("editFighterForm").style.display = "none";
        document.getElementById("editFighterTitle").style.display = "none";
        document.getElementById("addFighterForm").style.display = "block";
        document.getElementById("addFighterTitle").style.display = "block";  
    }
    
    // Add list Cancel Button
    document.getElementById("editCancelBtn").addEventListener("click", cancelFighterEdit);
    
    function cancelFighterEdit() {
        document.getElementById("editFighterForm").style.display = "none";
        document.getElementById("editFighterTitle").style.display = "none";
        document.getElementById("createNewFighterBtn").style.display = "block";
    }
    // Edit List Cancel Button
    document.getElementById("addCancelBtn").addEventListener("click", cancelFighterAdd);
    
    function cancelFighterAdd() {
        document.getElementById("addFighterForm").style.display = "none";
        document.getElementById("addFighterTitle").style.display = "none";
        document.getElementById("createNewFighterBtn").style.display = "block";
    }

    // Create New Fighter
     document.getElementById("addFighterBtn").addEventListener("click", addingFightertoList);
        function addingFightertoList() {
        //Fighter Fields
        var name = $("#name").val();
        var height = $("#height").val();
        var weight = $("#weight").val();
        var occupation = $("#occupation").val();
        
        document.getElementById("addFighterForm").style.display = "none";
        document.getElementById("addFighterTitle").style.display = "none";
        document.getElementById("createNewFighterBtn").style.display = "block";
        
            let docuName = name+".fighter";
            fightersRef.doc(docuName).set({
                name: name,
                height: height,
                weight: weight,
                occupation: occupation
            });
            console.log("Fighter Added");    
        };

    // Edit Fighter
    document.getElementById("editSaveChangesBtn").addEventListener("click", editingFighterInfo);
        function editingFighterInfo() {
        //Fighter Fields
        var name = $("#editName").val();
        var height = $("#editHeight").val();
        var weight = $("#editWeight").val();
        var occupation = $("#editOccupation").val();
         
        document.getElementById("editFighterForm").style.display = "none";
        document.getElementById("editFighterTitle").style.display = "none";
        
            let docuName = name+".fighter";
            fightersRef.doc(docuName).set({
                name: name,
                height: height,
                weight: weight,
                occupation: occupation
            },
            {
                merge: true
            });
         
            console.log("Editing Fighter Complete");  
        };

    // Editing the Fighter Info
    
    $("div.fighterList").on("click","button.editFighterBtn", function(){
        
        document.getElementById("editFighterForm").style.display = "block";
        document.getElementById("editFighterTitle").style.display = "block";

        $("#editName").val($(this).closest('ul').find('.name').text());
        $("#editHeight").val($(this).closest('ul').find('.height').text());
        $("#editWeight").val($(this).closest('ul').find('.weight').text());
        $("#editOccupation").val($(this).closest('ul').find('.occupation').text());
    });


//Delete Fighter
$("div.fighterList").on("click","button.deleteFighterBtn", function(){
        //Get the Fighter Data
        var Name = $(this).closest('ul').find('.name').text();
        
        let docuName = Name+".fighter";
        db.collection("Fighters").doc(docuName).delete()
    });

// Starter Data
fightersRef.doc("Cammy.fighter").set({
    name: "Cammy",
    height: "5'4\"",
    weight: "134lbs",
    occupation: "Delta Red Operative"
 });

fightersRef.doc("Ken.fighter").set({
    name: "Ken",
    height: "5'9\"",
    weight: "183lbs",
    occupation: "Martial Artist"
 });

fightersRef.doc("Guile.fighter").set({
    name: "Guile",
    height: "5'11\"",
    weight: "211lbs",
    occupation: "USAF Soldier"
 });

fightersRef.doc("Sagat.fighter").set({
    name: "Sagat",
    height: "7'5\"",
    weight: "216lbs",
    occupation: "Martial Artist"
 });







