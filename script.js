var tickets = [];

function createTicket() {
    var title = document.getElementById("ticketTitle").value.trim();
    var description = document.getElementById("ticketDescription").value.trim();
    var priority = document.getElementById("ticketPriority").value;
    var message = document.getElementById("message");

    if (title == "" || description == "") {
        message.style.color = "red";
        message.innerText = "Please fill in all fields.";
        return;
    }

    var ticket = {
        id: Date.now(),
        title: title,
        description: description,
        priority: priority,
        status: "Open"
    };

    tickets.push(ticket);
    saveTickets();

    document.getElementById("ticketTitle").value = "";
    document.getElementById("ticketDescription").value = "";

    message.style.color = "green";
    message.innerText = "Ticket created successfully.";

    renderTickets(tickets);
}

function renderTickets(list) {
    var ticketList = document.getElementById("ticketList");
    ticketList.innerHTML = "";

    if (list.length == 0) {
        ticketList.innerHTML = "<p>No tickets found.</p>";
        return;
    }

    for (var i = 0; i < list.length; i++) {
        var ticket = list[i];

        var priorityClass = "";
        if (ticket.priority == "High") priorityClass = "priority-high";
        if (ticket.priority == "Medium") priorityClass = "priority-medium";
        if (ticket.priority == "Low") priorityClass = "priority-low";

        ticketList.innerHTML +=
            "<div class='ticket-card " + priorityClass + "'>" +
                "<h3>" + ticket.title + "</h3>" +
                "<p>" + ticket.description + "</p>" +
                "<p><strong>Priority:</strong> " + ticket.priority + "</p>" +
                "<p><strong>Status:</strong> <span class='status'>" + ticket.status + "</span></p>" +
                "<div class='ticket-actions'>" +
                    "<button onclick='changeStatus(" + ticket.id + ", \"In Progress\")'>In Progress</button>" +
                    "<button onclick='changeStatus(" + ticket.id + ", \"Closed\")'>Close</button>" +
                    "<button onclick='deleteTicket(" + ticket.id + ")'>Delete</button>" +
                "</div>" +
            "</div>";
    }
}

function changeStatus(id, status) {
    for (var i = 0; i < tickets.length; i++) {
        if (tickets[i].id == id) {
            tickets[i].status = status;
        }
    }

    saveTickets();
    renderTickets(tickets);
}

function deleteTicket(id) {
    var updatedTickets = [];

    for (var i = 0; i < tickets.length; i++) {
        if (tickets[i].id != id) {
            updatedTickets.push(tickets[i]);
        }
    }

    tickets = updatedTickets;
    saveTickets();
    renderTickets(tickets);
}

function filterTickets(status) {
    if (status == "All") {
        renderTickets(tickets);
        return;
    }

    var filtered = [];

    for (var i = 0; i < tickets.length; i++) {
        if (tickets[i].status == status) {
            filtered.push(tickets[i]);
        }
    }

    renderTickets(filtered);
}

function saveTickets() {
    localStorage.setItem("supportDeskTickets", JSON.stringify(tickets));
}

function loadTickets() {
    var saved = localStorage.getItem("supportDeskTickets");

    if (saved) {
        tickets = JSON.parse(saved);
    }

    renderTickets(tickets);
}

loadTickets();
