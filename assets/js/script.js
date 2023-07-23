// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // Function to save user input in local storage when the save button is clicked
    $(".saveBtn").on("click", function () {
      var description = $(this).siblings(".description").val().trim();
      var timeBlockId = $(this).parent().attr("id");
      localStorage.setItem(timeBlockId, description);
    });
  
    // Function to apply past, present, or future class to each time-block based on the current hour
    function updateHourClasses() {
      var currentHour = dayjs().format("H");
      $(".time-block").each(function () {
        var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
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
  