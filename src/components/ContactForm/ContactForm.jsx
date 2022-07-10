import React from 'react';
import { PropTypes } from 'prop-types';

import { StyledContactForm } from './Styled';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleInputsChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const newContact = {
      name: this.state.name,
      number: this.state.number,
    };

    this.props.addContact(newContact);
    this.setState(() => ({ number: '', name: '' }));
  };

  static propTypes = {
    addContact: PropTypes.func.isRequired,
  };

  render() {
    const { name, number } = this.props;

    return (
      <StyledContactForm onSubmit={this.handleSubmit}>
        <label className="input-group">
          <span className="name">Name</span>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={this.handleInputsChange}
            required
          />
        </label>
        <label className="input-group">
          <span className="name">Number</span>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={this.handleInputsChange}
            required
          />
        </label>

        <button type="submit">Add contact</button>
      </StyledContactForm>
    );
  }
}

export default ContactForm;
