"use client";

import React, { useState } from "react";
import Container from "@/components/ui/container";
import { Form, Input, Button, Textarea, Checkbox } from "@heroui/react";
import FileUpload from "@/components/screens/main/fileUpload";
import Image from "next/image";
import Header from "../../layout/header";

const MainContent = () => {
  const [submitted, setSubmitted] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [selectedVisas, setSelectedVisas] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleVisaSelection = (visa: string) => {
    setSelectedVisas((prev) =>
      prev.includes(visa) ? prev.filter((v) => v !== visa) : [...prev, visa]
    );
  };

  const validateForm = (formData: FormData) => {
    let errors: { [key: string]: string } = {};

    if (!formData.get("firstName")) errors.firstName = "First Name is required";
    if (!formData.get("lastName")) errors.lastName = "Last Name is required";
    if (!formData.get("email")) errors.email = "Email is required";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get("email") as string)
    ) {
      errors.email = "Invalid email format";
    }
    if (!formData.get("country"))
      errors.country = "Country of Citizenship is required";
    if (!resume) errors.resume = "Resume is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (validateForm(formData)) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className="sm:max-w-md max-w-xs w-full">
          <Image
            src="/information.png"
            alt="Visa form icon"
            width={50}
            height={50}
            className="mx-auto mb-4"
          />

          <h2 className="text-xl font-bold text-center text-gray-900 my-3">
            Want to understand your visa options?
          </h2>
          <p className="text-center text-gray-900 text-sm mb-10">
            Submit the form below and our team of experienced attorneys will
            review your information.
          </p>

          {!submitted ? (
            <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                isRequired
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                errorMessage={errors.firstName}
              />
              <Input
                isRequired
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                errorMessage={errors.lastName}
              />
              <Input
                isRequired
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                errorMessage={errors.email}
              />
              <Input
                isRequired
                label="Country of Citizenship"
                name="country"
                placeholder="Enter your country"
                errorMessage={errors.country}
              />
              <Input
                label="LinkedIn / Personal Website"
                name="linkedin"
                placeholder="Enter URL"
              />

              <FileUpload onFileSelect={setResume} />
              {errors.resume && (
                <p className="text-red-500 text-sm">{errors.resume}</p>
              )}

              <Image
                src="/information.png"
                alt="Visa form icon"
                width={50}
                height={50}
                className="mx-auto mt-7 mb-4"
              />
              <div className="text-left">
                <p className="text-xl font-bold text-center text-gray-900 pb-3">
                  Visa categories of interest:
                </p>
                <div className="flex flex-col gap-2">
                  {["O-1", "EB-2", "EB-3 / H1B", "I don't know"].map((visa) => (
                    <Checkbox
                      key={visa}
                      name="visaCategories"
                      value={visa}
                      onChange={() => handleVisaSelection(visa)}
                    >
                      {visa}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <Image
                src="/information.png"
                alt="Visa form icon"
                width={50}
                height={50}
                className="mx-auto mt-7 mb-4"
              />

              <p className="text-xl font-bold text-center text-gray-900">
                How we can help you?
              </p>

              <Textarea
                label="How can we help you?"
                name="message"
                placeholder="Describe your situation..."
              />

              <Button
                className="bg-black w-full text-white py-6 rounded-lg text-lg mt-4"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          ) : (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
                <Image
                  src="/information.png"
                  alt="Visa form icon"
                  width={70}
                  height={70}
                  className="mx-auto mb-4"
                />

                <h3 className="text-2xl font-bold text-gray-900">Thank you!</h3>
                <p className="text-gray-700 mt-2 text-lg">
                  Your information is saved.
                </p>
                <Button
                  className="bg-black w-full text-white py-6 px-6 rounded-lg mt-6 text-lg"
                  onClick={() => setSubmitted(false)}
                >
                  Go Home
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default MainContent;
