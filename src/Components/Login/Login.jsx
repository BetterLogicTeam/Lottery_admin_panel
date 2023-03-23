import React, { useState } from "react";
import lucky from "../../Assets/images/lucky.png";
import "./Login.css";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineGoogle } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Connect_wallet_modal from "../Connect_wallet_modal/Connect_wallet_modal";
import { Button, Checkbox, Form, Input } from "antd";
import { Modal } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  let isuser= localStorage.getItem("UserAuth")
  const [modalShow, setModalShow] = React.useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinner, setspinner] = useState(false);
  let location = useLocation();
 
  const history = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    setspinner(true);
    console.log("Success:", values);
    let res = await axios.post("https://winner.archiecoin.online/admin_login", {
      email: values.email,
      password: values.password,
    });
    if (res.data.success == true) {
      toast.success(res.data.msg);
      history("/admin_panel");
      localStorage.setItem("UserAuth",true)
      setisLogin(true);
      handleCancel();
    } else {
       setspinner(false);
      toast.error(res.data.msg);
    }

    console.log("Login_Res", res.data.success);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="mb-5">
      <div>
        <div className="header-top-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header-top-area-inner">
                      <a href="" className="logo">
                        <img src={lucky} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </div>
       <Form
        className="main_form"
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="form_ittem">
          <Form.Item
            label="Admin Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="d-flex justify-content-center">
            <Button
              type="primary"
              htmlType="submit"
              className="custom-button2 navmainbt"
            >
              {spinner == true ? (
                    <>
                      {" "}
                      <p class="spinner-border" role="status">
                        <span class="visually-hidden"></span>
                      </p>
                    </>
                  ) : (
                    "Submit"
                  )}
            </Button>
          </Form.Item>
          </div>
        </Form>
    </div>
  );
}

export default Login;
