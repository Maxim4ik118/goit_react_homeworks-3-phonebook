import React from 'react';

import PropTypes from 'prop-types';

import { StyledContactList } from './Styled';

const ContactList = ({ contacts, filter, onDelete }) => {
  const contactsFilteredByName = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <StyledContactList>
      <ul className="contacts">
        {contactsFilteredByName.length === 0 && <p>There are no contacts found!</p>}
        {contactsFilteredByName.length > 0 &&
          contactsFilteredByName.map(({ id, name, number }) => {
            return (
              <li key={id} className="contact">
                <span className="contact-name">{name}</span>:&nbsp;{number}
                <button className="delete-contact-btn" type="button" onClick={() => onDelete(id)}>
                  Delete
                </button>
              </li>
            );
          })}
      </ul>
    </StyledContactList>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
