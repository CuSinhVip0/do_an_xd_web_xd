"use client";
import { useState, useRef, useEffect } from "react";
import Table from "@/components/tableData";
import { HOST } from "@/Data";
import { Spinner } from "@nextui-org/react";

function ViewMark() {
    const [loading, setLoading] = useState(false);
    const noti = useRef();
    const [input, setInput] = useState();
    const [infor, setInfor] = useState();
    const [data, setData] = useState();

    // useEffect(() => {
    //     document.getElementById("noti").innerText = "Nhập mã số sinh viên vào đi";
    // }, []);
    const handleSend = async () => {
        setInfor();
        setData([]);
        try {
            setLoading(true);
            const responce = await fetch(HOST + "/api/score/get-by-student/" + input).then((res) => res.json());
            if (!responce.masinhvien) {
                document.getElementById("noti").innerText = "Sai mã sinh viên";
                alert("Nhập sai mã sinh viên");
                setLoading(false);
            } else {
                setData(responce.data);
                responce.data.length == 0 && (document.getElementById("noti").innerText = "Chưa có điểm");

                setInfor({ tensinhvien: responce.tensinhvien, masinhvien: responce.masinhvien });
                setLoading(false);
            }
        } catch (err) {
            alert("Xãy ra lỗi, Liên hệ Nguyễn Khắc Thế để được hổ trợ !!!");
            setLoading(false);
        }
    };
    return (
        <div className="my-10">
            <div className="my-10 max-w-[640px] flex flex-col justify-center items-center gap-5 mx-auto bg-[#D9D9D9] rounded-md py-10 shadow-xl border-[1px] border-gray-400">
                <input
                    value={input}
                    onChange={(e) => {
                        if (e.target.value == "") {
                            document.getElementById("noti").innerText = "Nhập mã số sinh viên vào đi";
                        }
                        setInput(e.target.value);
                    }}
                    placeholder="Nhập vào mã số sinh viên"
                    className="px-3 py-2 outline-none rounded-sm border-[1px] border-gray-400 focus:border-gray-700"
                />
                <button
                    onClick={handleSend}
                    className="py-2 px-4 bg-black flex justify-center items-center text-white rounded-sm hover:bg-[#3b5d4f]"
                >
                    {loading ? <Spinner size="md" /> : "Xem điểm"}
                </button>
            </div>
            {/* show dâta */}
            {loading && <h2 className="text-center font-bold">Loading...</h2>}
            {infor && (
                <div className="w-full mx-auto flex justify-center flex-col items-center mb-6">
                    <p>Sinh viên: {infor.tensinhvien}</p>
                    <p>MSSV: {infor.masinhvien}</p>
                </div>
            )}
            {data && data.length > 0 ? (
                <Table
                    titledata={{
                        mamonhoc: "Mã môn học",
                        tenmonhoc: "Tên môn học",
                        hocki: "Học kỳ",
                        nam: "Năm học",
                        ptramquatrinh: "% QT",
                        ptramgiuaki: "% GK",
                        ptramcuoiki: "% CK",
                        diemquatrinh: "QT",
                        diemgiuaki: "GK",
                        diemcuoiki: "CK",
                        AvgScore: "Tổng",
                        result: "Kết Quả",
                    }}
                    data={data}
                />
            ) : (
                <p id="noti" ref={noti} className={`${loading && "hidden"}  text-center`}>
                    Nhập mã số sinh viên vào đi
                </p>
            )}
        </div>
    );
}

export default ViewMark;
