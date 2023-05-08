/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./services.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [control, setControl] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const options = {
      method: "POST",
      body: data,
    };
    fetch("http://localhost:5000/addServices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response?.insertedId) {
          setControl(!control);
        }
      })
      .catch((err) => console.error(err));
    console.log(data);
  };

  useEffect(() => {
    fetch("http://localhost:5000/allServices")
      .then((res) => res.json())
      .then((data) => setServicesData(data));
  }, [control]);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/remove/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.deletedCount > 0) {
          setControl(!control);
        }
      });
  };

  return (
    <div>
      <div className="post-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input className="items" defaultValue="test" {...register("name")} />
          <br />
          <input className="items" defaultValue="test" {...register("email")} />
          <br />
          {/* include validation with required or other standard HTML validation rules */}
          <input
            className="items"
            {...register("message", { required: true })}
          />
          <br />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>

      {/* <h1>Our Services</h1> */}
      <div className="services">
        {servicesData?.map((service) => (
          <div key={service?.id} className="service-card">
            <h2>{service?.name}</h2>
            <p>{service?.email}</p>
            <p>Price: {service?.message}</p>
            <button onClick={() => handleDelete(service?._id)}>Delete</button>
            <Link to={`/services/${service?._id}`}>
              <button>Edit</button>
            </Link>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Services;
