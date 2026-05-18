function KpiCard({ title, value }) {

  return (

    <div className="bg-white shadow-md rounded p-4">

      <h2 className="text-gray-500 text-lg">
        {title}
      </h2>

      <p className="text-3xl font-bold text-blue-600">
        {value}
      </p>

    </div>
  );
}

export default KpiCard;