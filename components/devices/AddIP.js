import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

const validateIpAddress = (ipAddress) => {
  const regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return regex.test(ipAddress);
};

export default function AddIP({ ipAddress, setIpAddress, setConnected }) {
  const inputRef = useRef("");
  const infoRef = useRef("");

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("ipAddress"));
    item === null ? setIpAddress([]) : setIpAddress(item);
  }, []);

  const addIpAddress = (e) => {
    e.preventDefault();

    if (inputRef.current.value === "") {
      toast.error("Enter the IP address first");
      inputRef.current.focus();
      return;
    }

    if (infoRef.current.value === "") {
      toast.error("Enter device information first");
      infoRef.current.focus();
      return;
    }

    if (!validateIpAddress(inputRef.current.value)) {
      toast.error("Invalid IP address");
      return;
    }

    const duplicate = ipAddress.filter(
      (device) => device.ip === inputRef.current.value
    );
    if (duplicate.length > 0) {
      toast.error("This IP address already exists");
      return;
    }

    setIpAddress([
      ...ipAddress,
      {
        ip: inputRef.current.value,
        tag: infoRef.current.value,
      },
    ]);

    setConnected([]);

    localStorage.setItem(
      "ipAddress",
      JSON.stringify([
        ...ipAddress,
        {
          ip: inputRef.current.value,
          tag: infoRef.current.value,
        },
      ])
    );

    inputRef.current.value = "";
    infoRef.current.value = "";
    inputRef.current.focus();
    toast.success("New Device added successfully");
  };

  return (
    <form onSubmit={addIpAddress} className="col-span-3">
      <div className="grid grid-cols-12 gap-3 ">
        <div className="col-span-3 flex flex-col">
          <label>Device IP</label>
          <input
            ref={inputRef}
            type="text"
            placeholder="192.168.31.100"
            autoComplete="off"
          />
        </div>

        <div className="col-span-7 flex flex-col">
          <label>Device Information</label>
          <input
            ref={infoRef}
            type="text"
            placeholder="Device Info"
            autoComplete="off"
          />
        </div>

        <div className="col-span-2 self-end">
          <button className="" onClick={addIpAddress}>
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
