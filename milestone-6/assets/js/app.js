const app = new Vue({
    el: "#app",

    data: {
        contacts: [
            {
                name: "Michele",
                avatar: "_1",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 16:15:22",
                        text: "Tutto fatto!",
                        status: "received"
                    }
                ]
            },
            {
                name: "Fabio",
                avatar: "_2",
                visible: true,
                messages: [
                    {
                        date: "20/03/2020 16:30:00",
                        text: "Ciao come stai?",
                        status: "sent"
                    },
                    {
                        date: "20/03/2020 16:30:55",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received"
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent"
                    }
                ]
            },
            {
                name: "Samuele",
                avatar: "_3",
                visible: true,
                messages: [
                    {
                        date: "28/03/2020 10:10:40",
                        text: "La Marianna va in campagna",
                        status: "received"
                    },
                    {
                        date: "28/03/2020 10:20:10",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent"
                    },
                    {
                        date: "28/03/2020 16:15:22",
                        text: "Ah scusa!",
                        status: "received"
                    }
                ]
            },
            {
                name: "Luisa",
                avatar: "_4",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Lo sai che ha aperto una nuova pizzeria?",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received"
                    }
                ]
            },

            {
                name: "Vincenzo",
                avatar: "_5",
                visible: true,
                messages: [{}]
            },

            {
                name: "Sara",
                avatar: "_6",
                visible: true,
                messages: [{}]
            },

            {
                name: "Ugo",
                avatar: "_7",
                visible: true,
                messages: [{}]
            },

            {
                name: "Francesco",
                avatar: "_8",
                visible: true,
                messages: [{}]
            }
        ],

        currentContact: {
            name: "",
            avatar: "",
            visible: true,
            messages: [{}]
        },

        messageBar: "",

        popup: {
            visible: false,
            index: 0
        },

        searchQuery: "",

        userImage: "./assets/img/avatar_io.jpg",

        username: "Gaia"
    },

    methods: {
        /**
         * Change the current displayed contact to be the one you clicked on
         * @param {number} index - The index that references the contact you clicked on
         */
        changeContact(index) {
            this.currentContact = this.contacts[index];
        },

        /**
         * Trigger deletion confirmation popup
         * @param {number} index - The index that references the message you clicked on
         */
        triggerPopup(index) {
            // Make sure that the dropdown menu is closed
            this.toggleDropdown(index);

            // Make popup appear
            this.popup.visible = true;

            // Pass the index we clicked on to Vue data
            this.popup.index = index;
        },

        /**
         * Delete the message that has been clicked on
         * and close the dropdown menu
         * @param {number} index - The index that references the message you clicked on
         */
        deleteMessage(index) {
            const messages = this.currentContact.messages;
            messages.splice(index, 1);
        },

        /**
         * Return current time as a string using day.js
         */
        getCurrentTime() {
            const currentTime = dayjs().format("DD/MM/YYYY HH:mm:ss");
            return currentTime;
        },

        /**
         * Receive message from contact 1 second after you"ve sent it
         */
        receiveMessage() {
            setTimeout(function () {
                app.currentContact.messages.push(
                    {
                        date: app.getCurrentTime(),
                        text: "Ok",
                        status: "received"
                    }
                );
            }, 1000);

            // Scroll the page down to the new message
            this.scrollDown();
        },

        /**
         * Scroll down to the last message
         */
        scrollDown() {
            const messageContainer = document.querySelector(".messages");
            messageContainer.scrollTop = messageContainer.scrollHeight;
        },

        /**
         * Search for a name in the contact list
         */
        search() {
            const searchQuery = this.searchQuery.toLowerCase();

            this.contacts.forEach(function (contact) {
                const contactName = contact.name.toLowerCase();

                if (contactName.includes(searchQuery)){
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            });
        },

        /**
         * Send messages pressing enter
         */
        sendMessage() {
            const messages = this.currentContact.messages;
            messages.push(
                { 
                    date: this.getCurrentTime(),
                    text: this.messageBar,
                    status: "sent"
                }
            );
            
            // Clean the message bar
            this.messageBar = "";
            
            // Trigger bot"s automatic response after 1 second
            this.receiveMessage();

            // Scroll the page down to the new message
            this.scrollDown();
        },

        /**
         * Toggle message dropdown when clicking on the arrow
         * @param {number} index - Index that references the dropdown you clicked on
         */
        toggleDropdown(index) {
            const elDropdowns = document.querySelectorAll(".dropdown-menu");
            let dropdownStyle = elDropdowns[index].style;

            if (dropdownStyle.display === "flex") {
                dropdownStyle.display = "none";
            } else {
                dropdownStyle.display = "flex";
            }
        }
    },

    mounted() {
        // Make the first contact be the default one on page load
        this.currentContact = this.contacts[0];

        // Code that runs after the entire view has been rendered
        this.$nextTick(function () {
            // Scroll the messages section to bottom
            this.scrollDown();
        });

        // Close dropdown menu when clicking outside of it
        document.addEventListener("click", function (event) {
            const elDropdowns = document.querySelectorAll(".dropdown-menu");
            
            // If you clicked on a dropdown arrow 
            // or a "delete message" button
            // exit this event listener
            const targetClasses = event.target.classList;
            if (targetClasses.contains("dropdown-arrow") || targetClasses.contains("delete-message")) {
                return;
            }

            elDropdowns.forEach(function (dropdown) {
                if (dropdown.style.display === "flex") {
                    dropdown.style.display = "none";
                }
            });
        }, true);
    }
});

