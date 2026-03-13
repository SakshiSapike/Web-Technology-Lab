import React, { useState } from "react";

const initialData = {
  fullName: "",
  email: "",
  mobileNumber: "",
  studentId: "",
  department: "",
  year: "",
  course: "",
  eventInterest: "",
  preferredClub: "",
  emergencyContact: "",
  dietaryPreference: "",
  portfolioUrl: "",
  accommodationNeeded: "No",
  comments: ""
};

function RegistrationForm() {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    alert("Registration submitted successfully.");
    setFormData(initialData);
  };

  return (
    <section className="page register-page">
      <div className="page-heading">
        <p className="eyebrow">Registration Form</p>
        <h1>Student Event Enrollment</h1>
        <p>Fill out your profile once and join curated activities across all departments.</p>
      </div>

      <form className="form-panel" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@college.edu"
              required
            />
          </label>

          <label>
            Mobile Number
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="10 digit number"
              pattern="[0-9]{10}"
              required
            />
          </label>

          <label>
            Student ID
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="College enrollment number"
              required
            />
          </label>

          <label>
            Department
            <select name="department" value={formData.department} onChange={handleChange} required>
              <option value="">Select department</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ENTC">Electronics and Telecommunication</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </label>

          <label>
            Year
            <select name="year" value={formData.year} onChange={handleChange} required>
              <option value="">Select year</option>
              <option value="1st">First Year</option>
              <option value="2nd">Second Year</option>
              <option value="3rd">Third Year</option>
              <option value="4th">Fourth Year</option>
            </select>
          </label>

          <label>
            Program
            <select name="course" value={formData.course} onChange={handleChange} required>
              <option value="">Select program</option>
              <option value="BTech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="BSc">BSc</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
            </select>
          </label>

          <label>
            Event Interest
            <select
              name="eventInterest"
              value={formData.eventInterest}
              onChange={handleChange}
              required
            >
              <option value="">Select preference</option>
              <option value="Technical">Technical Events</option>
              <option value="Cultural">Cultural Events</option>
              <option value="Management">Management Events</option>
              <option value="Sports">Sports Activities</option>
            </select>
          </label>

          <label>
            Preferred Club
            <input
              type="text"
              name="preferredClub"
              value={formData.preferredClub}
              onChange={handleChange}
              placeholder="Coding Club / Robotics Club"
            />
          </label>

          <label>
            Emergency Contact
            <input
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Guardian contact number"
              pattern="[0-9]{10}"
              required
            />
          </label>

          <label>
            Dietary Preference
            <select
              name="dietaryPreference"
              value={formData.dietaryPreference}
              onChange={handleChange}
            >
              <option value="">Select option</option>
              <option value="Regular">Regular</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="No Preference">No Preference</option>
            </select>
          </label>

          <label>
            Portfolio URL
            <input
              type="url"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>

          <label>
            Accommodation Needed
            <select
              name="accommodationNeeded"
              value={formData.accommodationNeeded}
              onChange={handleChange}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </label>

          <label className="full-width">
            Additional Notes
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
              placeholder="Mention accessibility, special requirements, or expectations."
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary form-submit">
          Submit Registration
        </button>
      </form>
    </section>
  );
}

export default RegistrationForm;
