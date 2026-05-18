function StatusBadge({ status }) {

  let color = "bg-gray-500";

  if (status === "Approved") {
    color = "bg-green-500";
  }

  else if (status === "Pending") {
    color = "bg-yellow-500";
  }

  else if (status === "Rejected") {
    color = "bg-red-500";
  }

  return (

    <span
      className={`${color} text-white px-3 py-1 rounded-full text-sm`}
    >

      {status}

    </span>
  );
}

export default StatusBadge;