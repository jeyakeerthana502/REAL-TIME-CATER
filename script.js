// Fetch existing bookings and render the calendar
document.addEventListener("DOMContentLoaded", () => {
    const calendarDiv = document.getElementById("booking-calendar");
  
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((bookings) => renderCalendar(bookings))
      .catch((error) => console.error("Error fetching bookings:", error));
  
    // Render the calendar
    function renderCalendar(bookings) {
      const today = new Date();
  
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toISOString().split("T")[0];
  
        const dateDiv = document.createElement("div");
        dateDiv.style.border = "1px solid #ccc";
        dateDiv.style.margin = "5px";
        dateDiv.style.padding = "10px";
  
        const status = bookings.some((b) => b.date === dateString) ? "Booked" : "Available";
        dateDiv.innerHTML = `<strong>${dateString}</strong><br>Status: ${status}`;
  
        if (status === "Available") {
          const button = document.createElement("button");
          button.textContent = "Book Now";
          button.onclick = () => bookDate(dateString);
          dateDiv.appendChild(button);
        }
  
        calendarDiv.appendChild(dateDiv);
      }
    }
  
    // Function to book a date
    function bookDate(date) {
      const name = prompt("Enter your name:");
      const email = prompt("Enter your email:");
  
      if (name && email) {
        fetch("/api/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date, name, email }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Booking failed");
            }
            return response.json();
          })
          .then((data) => {
            alert(data.message);
            location.reload(); // Reload the page to update the calendar
          })
          .catch((error) => console.error("Error:", error));
      }
    }
  });
  