import { useState, useEffect } from "react";
import removeAccents from "remove-accents";
export default function Table(props) {
    const [data, setData] = useState(props.data);
    useEffect(() => {
        setData(props.data);
    }, [props.data]);
    return (
        <div className="px-20 ">
            <div className=" table border-collapse border w-full mt-2  bg-white table-fixed ">
                <div className="table-header-group box-border ">
                    <div className="table-row">
                        {Object.values(props.titledata).map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className="table-cell py-4 bg-[#ecf5ff] border  text-center font-bold "
                                >
                                    {value}
                                </div>
                            );
                        })}
                    </div>
                    <div className="table-row box-border w-full">
                        {Object.keys(props.titledata).map((value, index) => {
                            return (
                                (value == "mamonhoc" || value == "tenmonhoc") && (
                                    <div key={index} className="table-cell py-4  box-border border text-center  w-full">
                                        <div className="w-full px-2">
                                            <input
                                                onChange={(e) => {
                                                    if (e.target.value == "") {
                                                        setData(props.data);
                                                    } else {
                                                        const regex = new RegExp(e.target.value, "i");
                                                        const result =
                                                            props.data &&
                                                            props.data.filter((item) =>
                                                                regex.test(removeAccents(item[value]))
                                                            );

                                                        setData(result);
                                                    }
                                                }}
                                                type="text"
                                                className="border px-1 w-3/4  rounded-sm outline-none focus:shadow-md focus:shadow-cyan-500/50"
                                                placeholder="Search"
                                            />
                                        </div>
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
                <div className="table-row-group box-border">
                    {data &&
                        data.map((value, index) => {
                            const avg =
                                value.diemquatrinh * (value.ptramquatrinh / 100) +
                                value.diemgiuaki * (value.ptramgiuaki / 100) +
                                value.diemcuoiki * (value.ptramcuoiki / 100);

                            const k = { ...value, AvgScore: avg, result: avg > 5 ? "PASS" : "FAIL" };
                            return (
                                <div
                                    key={index}
                                    id={Object.values(value)[0]}
                                    className={`table-row ${index % 2 !== 0 ? "" : "bg-[#ecf5ff]"} hover:bg-gray-200`}
                                >
                                    {Object.keys(props.titledata).map((item, index) => {
                                        var x = Object.entries(k).find((i) => i[0].trim() == item.trim());

                                        return (
                                            <div
                                                key={x[0]}
                                                className="table-cell py-4 text-center  border  cursor-pointer "
                                            >
                                                <div className="block">{x[1]}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
