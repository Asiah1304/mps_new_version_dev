import React, { useState } from "react";
import { Button, Heading } from "evergreen-ui";
import swal from "sweetalert";

// components

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default function CardSettings({ notel = "" }) {

  const [error, setError]                   = useState(null);
  const [loading, setLoading]               = useState(false);
  const [password, setPassword]             = useState("");
  const [new_password, setNewPassword]      = useState("");
  const [conf_password, setConformPassword] = useState("");

  const username = sessionStorage.getItem('username');
  const email = sessionStorage.getItem('email');
  const nokp = sessionStorage.getItem('nokp');

  const handleUpdate = () => {

    var username  = document.getElementById("username").value;
    var email     = document.getElementById("email").value;
    var notel     = document.getElementById("notel").value;

    if (username == "") {
      swal("Opss!", "Kata nama tidak boleh dikosongkan.", "error");
      return false;
    }
    else if (email == "") {
      swal("Opss!", "Emel tidak boleh dikosongkan", "error");
      return false;
    }
    else if (notel == "") {
      swal("Opss!", "Nombor telefon tidak boleh dikosongkan", "error");
      return false;
    }
    else {

      var formdata = new FormData();

      formdata.append("username", username.trim());
      formdata.append("email", email.trim());
      formdata.append("nokp", nokp);
      formdata.append("notel", notel.trim());

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=update_profile";

      fetch(urlAPI, requestOptions)
        .then(response => response.json())
        .then(result => {

          if (result.status == "success") {

            setLoading("false");
            swal("Berjaya!", "Akaun profil anda sudah dikemaskini.", "success");

            sessionStorage.removeItem('username');
            sessionStorage.setItem('username', result.data[0]["U_USERNAME"]);

            sessionStorage.removeItem('email');
            sessionStorage.setItem('email', result.data[0]['U_USEREMAIL']);

            window.location.href = "./setting";

          }
          else {
            setLoading("false");
            swal("Ralat!", "Kemaskini tidak berjaya.", "error");
          }

        })
    }
  }

  const handleChangePassword = () => {

    if(password == ""){
      swal("Opss","Sila isi kata laluan terkini.","error");
    }else if(new_password == ""){
      swal("Opss","Sila isi kata laluan yang baru.","error")
    }else if(conf_password == ""){
      swal("Opss","Sila isi pengesahan kata laluan yang baru.","error")
    }else if(new_password !== conf_password){
      swal("Opss","Kata laluan anda tidak sah","error")
    }else{

      console.log(password);
      console.log(new_password);
      console.log(conf_password);
      swal({
        title:"Set Semula Kata Laluan",
        text:"Anda pasti untuk set semula kata laluan akaun anda?",
        button:true,
        dangerMode:true,
      }).then((change) => {
        if(change){
          swal("Kata laluan akaun anda sudah dikemaskini!");
        }else{
          
        }
      })
    }
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full h-full shadow-lg  bg-gray-300 border-0 rounded-2xl">
        <div className="rounded-t-2xl bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <Heading size={600}>Akaun myMPS</Heading>
            {/* <h6 className="text-gray-800 text-xl font-bold">Akaun mymps</h6> */}
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">

            </h6>
            <div className="flex flex-wrap">

              <div className="w-full  px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama Penuh
                  </label>
                  <input
                    type="text"
                    id="username"
                    {...username}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={sessionStorage.getItem("username")}
                  />
                </div>
              </div>

              <div className="w-full  px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    NOMBOR KAD PENGENALAN
                  </label>
                  <input
                    type="text"
                    {...nokp}
                    readOnly
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-200 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={sessionStorage.getItem("nokp")}
                  />
                </div>
              </div>

              <div className="w-full  px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Alamat Emel
                </label>
                  <input
                    type="email"
                    id="email"
                    {...email}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={sessionStorage.getItem("email")}
                  />
                </div>
              </div>

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    NOMBOR TELEFON
                  </label>
                  <input
                    type="text"
                    id="notel"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={notel}
                  />
                </div>
              </div>

            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
<<<<<<< HEAD
                  <Button
                    className="float-right"
                    appearance="primary"
                    intent="success"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Kemaskini
                  </Button>
                  {/* <button type="button" onClick={handleUpdate} class="bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded float-right">
=======
                  <button type="button" onClick={handleUpdate} className="bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded float-right">
>>>>>>> e065d249e8a3ac9cb8f599f24106303865ca8dbc
                    Kemaskini
                  </button> */}
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words w-full h-full shadow-lg  bg-gray-300 rounded-xl" style={{marginTop:"80px"}}>
        <div className="rounded-t-xl bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
          <Heading size={600}>Set semula kata laluan</Heading>
            {/* <h6 className="text-gray-800 text-xl font-bold">Tukar Kata Laluan</h6> */}
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blue-500 text-sm mt-3 mb-6 font-bold uppercase">

            </h6>
            <div className="flex flex-wrap">

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kata Laluan Sekarang
                  </label>
                  <input
                    type="text"
                    id="username"
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kata Laluan Baru
                  </label>
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Pengesahan Kata Laluan
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setConformPassword(e.target.value)}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <Button 
                  className="float-right"
                  type="button"
                  intent="success"
                  appearance="primary"
                  onClick={handleChangePassword}
                  >Kemaskini
                  </Button>
                  {/* <button type="button" onClick={handleChangePassword} class="bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded float-right">
                    Kemaskini
                  </button> */}
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
