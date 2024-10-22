// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({}); // State to hold error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error on change
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Subject
    if (!formData.subject || formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters long.';
    }

    // Validate Message
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate Phone (mandatory and must be 10 digits)
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number (no symbols).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here, such as sending data to an API or backend.
      console.log('Form submitted:', formData);
      alert('Thank you for reaching out. We will get back to you soon!');
      // Clear form data after submission
      setFormData({
        subject: '',
        message: '',
        email: '',
        phone: '',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-md gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Inquiry about the conference"
              required
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Write your message here..."
              required
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="you@example.com"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="1234567890"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <div>
        <div className="mt-8">
          <h3 className="text-lg font-bold">Contact Information</h3>
          <p className="mt-2">Email: contact@conference.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold">Location</h3>
          <p>University of Texas at Arlington, 701 S Nedderman Dr, Arlington, TX 76019, USA</p>
          <iframe
            className="mt-4 w-full h-64 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.9021050361594!2d-97.1159856844462!3d32.72832138099957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b5b7067e8b09%3A0xb9a637555ae1f394!2sUniversity%20of%20Texas%20at%20Arlington!5e0!3m2!1sen!2sus!4v1697888474210!5m2!1sen!2sus"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
