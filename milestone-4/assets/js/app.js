const app = new Vue({
    el: '#app',

    data:  {
        userImage: './assets/img/avatar_io.jpg',
        
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },

            {
                name: 'Vincenzo',
                avatar: '_5',
                visible: true,
                messages: [],
            },

            {
                name: 'Sara',
                avatar: '_6',
                visible: true,
                messages: [],
            },

            {
                name: 'Ugo',
                avatar: '_7',
                visible: true,
                messages: [],
            },

            {
                name: 'Francesco',
                avatar: '_8',
                visible: true,
                messages: [],
            }
        ],

        recipientImage: '',
        
        currentRecipient: '',

        msgBar: '',

        lastMessage: '',

        searchQuery: '',

        filteredContacts: ''
    },

    methods: {
        getContactImage(index) {
            const contact = this.contacts[index];
            const imagePath = `./assets/img/avatar${contact.avatar}.jpg`;
            return imagePath
        },

        selectContact(index) {
            this.currentRecipient = this.contacts[index];
        },

        updateRecipientImage(index) {
            const avatar = this.contacts[index].avatar;
            this.recipientImage = `./assets/img/avatar${avatar}.jpg`;
        },

        // Get current time as a string using day.js
        getCurrentTime() {
            const currentTime = dayjs().format('DD/MM/YYYY HH:mm:ss');
            return currentTime
        },

        // Send messages pressing enter
        sendMessage() {
            this.currentRecipient.messages.push(
                { 
                    date: this.getCurrentTime(),
                    text: this.msgBar,
                    status: 'sent'
                }
            );
            
            // Clean the message bar
            this.msgBar = '';
            
            // Trigger bot's response
            this.receiveMessage();
        },

        // Receive message from contact 1 second after you've sent it
        receiveMessage() {
            setTimeout(function () {
                app.currentRecipient.messages.push(
                    {
                        date: app.getCurrentTime(),
                        text: 'Ok',
                        status: 'received'
                    }
                );
            }, 1000);
        },

        // Search for a name in the contact list
        search() {
            this.filteredContacts = this.contacts.filter(contact => {
                return contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            });
        }
    },

    mounted() {
        // Make the first contact be the default one 
        this.currentRecipient = this.contacts[0];
        const firstContact = this.currentRecipient;
        this.recipientImage = `./assets/img/avatar${firstContact.avatar}.jpg`;

        // Code that runs after the entire view has been rendered
        this.$nextTick(function () {
            // Scroll the messages section to bottom
            this.lastMessage = document.querySelector('.message:last-child');
            this.lastMessage.scrollIntoView();
          })

        // Make the contact list start with all contacts visible
        this.filteredContacts = this.contacts;
    }
});