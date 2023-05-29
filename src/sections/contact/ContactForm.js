import { useState } from 'react';
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';
// config
import { SERVER_API } from '../../config';

// ----------------------------------------------------------------------

export default function ContactForm({ feedback }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
      feedback('Please fill in all fields.', { variant: 'error' });
      return;
    }
    // check for a valid email format using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      feedback('Please enter a valid email address.', { variant: 'error' });
      return;
    }

    fetch(`${SERVER_API}/support`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, message, name, email }),
    })
      .then((res) => {
        if (res.status === 200) {
          feedback('Message sent successfully!', { variant: 'success' });
          // clear state values
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
          // set TextField values to be empty
          document.getElementById('name').value = '';
          document.getElementById('email').value = '';
          document.getElementById('subject').value = '';
          document.getElementById('message').value = '';
        } else {
          feedback('Something went wrong', { variant: 'error' });
        }
      })
      .catch((err) => {
        console.error(err);
        feedback('Something went wrong', { variant: 'error' });
      });
  };
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Feel free to contact us. <br />
          We'll be glad to hear from you.
        </Typography>
      </m.div>

      <Stack spacing={3}>
        <m.div variants={varFade().inUp}>
          <TextField id="name" fullWidth label="Name" onChange={(e) => setName(e.target.value)} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField id="email" fullWidth label="Email" onChange={(e) => setEmail(e.target.value)} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField id="subject" fullWidth label="Subject" onChange={(e) => setSubject(e.target.value)} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField
            id="message"
            fullWidth
            label="Enter your message here."
            multiline
            rows={4}
            onChange={(e) => setMessage(e.target.value)}
          />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained" onClick={handleSubmit}>
          Submit Now
        </Button>
      </m.div>
    </Stack>
  );
}

ContactForm.propTypes = {
  feedback: PropTypes.func,
};
