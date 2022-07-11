import React from 'react';
import { nanoid } from 'nanoid';

import { Filter, ContactList, Section, ContactForm } from './components';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    if (!!localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = newContactData => {
    const newContactEntity = {
      id: nanoid(),
      ...newContactData,
    };

    !this.checkNewContactPresence(newContactEntity.name)
      ? this.setState(state => ({
          contacts: [...state.contacts, newContactEntity],
        }))
      : alert(`${newContactEntity.name} is already in contacts!`);
  };

  handleDeleteContact = contactId => {
    const newContacts = this.state.contacts.filter(
      contact => contact.id !== contactId
    );

    this.setState(() => ({ contacts: newContacts }));
  };

  handleFilterContactsByName = ({ target: { value } }) => {
    this.setState(() => ({ filter: value }));
  };

  checkNewContactPresence = contactName => {
    return this.state.contacts.some(contact => contact.name === contactName);
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className="app">
        <Section title="Phonebook">
          <ContactForm addContact={this.handleAddContact} />
        </Section>
        <Section title="Contacts">
          <Filter filter={filter} onChange={this.handleFilterContactsByName} />
          <ContactList
            contacts={contacts}
            filter={filter}
            onDelete={this.handleDeleteContact}
          />
        </Section>
      </div>
    );
  }
}

export default App;
