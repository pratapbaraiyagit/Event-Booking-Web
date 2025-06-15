import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Help() {
  return (
    <div className="help_wrapper">
      <div className="top_title">
        <h2 className="text_dark">Need a little help?</h2>
        <p>
          Welcome to the Best Parties Booking Management System. Below we have
          answered some of the most frequently asked questions to help you
          manage your booking for effectively.
        </p>
        <p>
          If you have further questions please contact us on{' '}
          <Link to="mailto:bookings@bestpartiesever.com">
            bookings@bestpartiesever.com
          </Link>{' '}
          or call <Link to="tel:01932359900">01932 359900</Link>.
        </p>
      </div>
      <div className="accordian_wrapper">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header> Why do I need to add guests?</Accordion.Header>
            <Accordion.Body>
              <p>
                There is no specific requirement for you to add guests to your
                booking, however we have worked hard to try and make managing
                your party as easy and as automated as can be. By adding the
                names and email addresses of all your guests you have the
                ability to do the following:
              </p>
              <ul>
                <li>
                  <h6>Email invitiations to your guests</h6>
                  <p>
                    You will have the ability to email invitiations to all your
                    guests whereupon receiving your guests will be able to log
                    in and respond stating whether they can or cannot attend the
                    party. This gives you a very easy way of keeping track of
                    your guests attendance availability.
                  </p>
                </li>
                <li>
                  <h6>Manage your guests' dietary requirements</h6>
                  <p>
                    You will have the ability to manage the dietary and
                    accessibility requirements for each of your guests. If your
                    guests respond to your invitiation and log in themselves
                    they can also manage their own dietary requirements directly
                    saving the organiser the headache of keeping track of this
                    themselves.
                  </p>
                </li>
                <li>
                  <h6>Send personalised party tickets to your guests</h6>
                  <p>
                    If you do not add any guests to your booking you will have
                    the ability to download all your tickets as a single file,
                    each ticket wil be numbered. If you add your guests to your
                    booking you will have the ability to send an individual
                    party ticket to each of your guests with a single click.
                    Each of the individual tickets will be numbered but also
                    have the name of each of your guests on. Your guests can
                    then show these tickets either on their smartphones or by
                    printing them off themselves saving you lots of time
                    printing and distributing tickets.
                  </p>
                </li>
                <li>
                  <h6>Keep your guests informed</h6>
                  <p>
                    By adding guests to your booking you will have the ability
                    to send party information and updates to each guest. The
                    kind of information you can send are details about the
                    party, hotel and taxi information; pre-party and post-party
                    tips and frequently asked questions (helpful for lost
                    property information!) and much more.
                  </p>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Why do I need to add guest email addresses?
            </Accordion.Header>
            <Accordion.Body>
              <p>
                Again there is no specific requirement for you to add guests
                email addresses, however we use the email address as a unique
                reference for each guest in order to allow them to log into the
                booking themselves to view their party information, update their
                attendance status, special/dietary requirements and download
                their party tickets.
              </p>
              <p>
                If you do not want to add the email address you can write the
                word "none" which will be accepted, however this essentially
                blocks your guest from being able to log in to download their
                party tickets or update their attendance status or special
                requirements.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How do I add guests?</Accordion.Header>
            <Accordion.Body>
              <p>
                Adding guests is very easy - if you already have a spreadsheet
                with all your guests in you can upload this or you can enter
                each guest individually. To start just click the Guest List tab
                above then click the <i className="pi pi-user-plus mx-2"></i>{' '}
                Add Guest button to add your first guest or the{' '}
                <i className="pi pi-upload mx-2"></i> Import button to upload
                your spreadsheet. Each guest requires a first name, last name
                and email address.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header> How do I invite my guests?</Accordion.Header>
            <Accordion.Body>
              <p>
                Once you have added all your guests click on the Email Guests
                tab above, select the "Party Invite" email from the "Select
                Email Template" option box then click "Preview Email" if you
                want to view it and add custom text, or just click "Send Email"
                to send to all your guests.
              </p>
              <p>
                If you wish to send emails to selected guests only then before
                you send the email scroll down to your list of guests and tick
                (or untick) the required guests in the list then scroll back up
                and click "Send Email"
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>How do I delete a guest?</Accordion.Header>
            <Accordion.Body>
              <p>
                You do not necessarily need to delete guests, you can just mark
                them as not attending, however if you do want to completely
                remove them from your guest list then firstly you need to ensure
                they are not set as a manager and their attendance status is set
                to either "No" or "Don't Know", then click their name to edit
                and under the "Update" button tick the "Delete Guest" box and
                click update - note that this acction cannot be undone.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              Can I give you dietary requirements without adding guests
            </Accordion.Header>
            <Accordion.Body>
              <p>
                If you have many guests and are not wanting any of them to
                manage their own place requirements and party tickets then you
                can turn off the guest section and add total numbers against
                each dietary/special requirement in the main booking screen.
              </p>
              <p>
                Turning off the Guest List will block any existing guests'
                access and eTickets will only be available with ticket numbers
                not guest names. There will also be no way of recording whether
                a guest is attending the party or not.
              </p>
              <p>
                This facility can only be enabled/disabled by the main party
                organiser and details can be found at the bottom of the Party
                Overview page. Enabling or disabling the Guest List will not
                remove any data but the party venue will only see individual
                guest requirements OR total guest requirements - not both - and
                cannot be responsible for data stored incorrectly in hidden
                areas.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
