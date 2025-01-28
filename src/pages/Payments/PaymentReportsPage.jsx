import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import Swal from "sweetalert2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const API_URL = "https://law-office.al-mosa.com/api";

const PaymentReports = () => {
  const [chartData, setChartData] = useState(null);
  const [paymentsList, setPaymentsList] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalPayments, setTotalPayments] = useState(0);
  const [hoveredPaymentAmount, setHoveredPaymentAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentsData();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [searchKeyword, paymentsList]);

  useEffect(() => {
    setTotalPayments(calculateTotalPayments());
  }, [paymentsList]);

  const fetchPaymentsData = async () => {
    Swal.fire({
      title: "جاري التحميل...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("لم يتم العثور على التوكن. يرجى تسجيل الدخول.");
      }

      const response = await axios.get(`${API_URL}/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const paymentsData = response.data.payments;
      setPaymentsList(paymentsData);
      setFilteredPayments(paymentsData);

      const chartData = prepareChartData(paymentsData);
      setChartData(chartData);
    } catch (err) {
      Swal.fire("خطأ", "فشل في جلب المدفوعات.", "error", { rtl: true });
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  const prepareChartData = (payments) => {
    const paymentsMap = new Map();
    payments.forEach((payment) => {
      const amount = parseFloat(payment.amount);
      paymentsMap.set(
        payment.title,
        (paymentsMap.get(payment.title) || 0) + amount
      );
    });

    const labels = Array.from(paymentsMap.keys());
    const dataValues = Array.from(paymentsMap.values());
    const backgroundColors = labels.map(() => generateRandomColor());

    return {
      labels,
      datasets: [
        {
          label: "توزيع المدفوعات",
          data: dataValues,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((color) =>
            color.replace("0.7", "1")
          ),
          borderWidth: 1,
          hoverOffset: 10,
        },
      ],
    };
  };

  const filterPayments = () => {
    if (!searchKeyword) {
      setFilteredPayments(paymentsList);
      return;
    }
    const filtered = paymentsList.filter((payment) =>
      payment.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredPayments(filtered);
  };

  const calculateTotalPayments = () => {
    return paymentsList.reduce(
      (total, payment) => total + parseFloat(payment.amount),
      0
    );
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: { font: { size: 14 } },
      },
      title: {
        display: true,
        text: "توزيع المدفوعات",
        font: { size: 18 },
      },
    },
    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        const index = chartElement[0].index;
        const amount = chartData.datasets[0].data[index];
        setHoveredPaymentAmount(amount);
      } else {
        setHoveredPaymentAmount(null);
      }
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-blue-600">
          جاري التحميل...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg" dir="rtl">
      <h2 className="text-center text-2xl font-bold text-blue-800 mb-6">
        تقارير المدفوعات
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          {chartData && (
            <div className="w-full h-96">
              <Pie data={chartData} options={chartOptions} />
            </div>
          )}
          <p className="mt-4 text-lg font-semibold">
            {hoveredPaymentAmount !== null ? (
              <>قيمة الدفعة: {hoveredPaymentAmount.toFixed(2)} ج.م</>
            ) : (
              <>إجمالي المدفوعات: {totalPayments.toFixed(2)} ج.م</>
            )}
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="ابحث عن المدفوعات..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded shadow-sm focus:ring focus:ring-blue-200"
          />
          <div className="overflow-y-auto max-h-96 space-y-4">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 bg-white shadow rounded border"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {payment.title}
                  </h3>
                  <p className="text-gray-600">المبلغ: {payment.amount} ج.م</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                لا توجد مدفوعات للعرض.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReports;
