// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function() {});
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  
  

  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // Function to save user input in local storage when the save button is clicked
    $(".saveBtn").on("click", function () {
      // Get the description (user input) from the corresponding textarea
      var description = $(this).siblings(".description").val().trim();
      
      // Get the id of the time-block containing the clicked button
      var timeBlockId = $(this).parent().attr("id");
      
      // Save the description in local storage using the time-block id as the key
      localStorage.setItem(timeBlockId, description);
    });
  
    // Function to apply past, present, or future class to each time-block based on the current hour
    function updateHourClasses() {
      // Get the current hour using Day.js
      var currentHour = dayjs().format("H");
  
      // Loop through each time-block and compare its id to the current hour
      $(".time-block").each(function () {
        var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
  
        // Remove all classes and then apply the appropriate class based on the comparison
        $(this).removeClass("past present future");
        if (timeBlockHour < currentHour) {
          $(this).addClass("past");
        } else if (timeBlockHour === currentHour) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }
  
    // Function to load saved user input from local storage and set textarea values
    function loadSavedDescriptions() {
      // Loop through each time-block and set the textarea value if saved in local storage
      $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var savedDescription = localStorage.getItem(timeBlockId);
  
        if (savedDescription) {
          $(this).find(".description").val(savedDescription);
        }
      });
    }
  
    // Function to display the current date in the header of the page
    function displayCurrentDate() {
      var currentDate = dayjs().format("dddd, MMMM D");
      $("#currentDay").text(currentDate);
    }
  
    // Call the necessary functions to initialize the page
    updateHourClasses();
    loadSavedDescriptions();
    displayCurrentDate();
  });
  