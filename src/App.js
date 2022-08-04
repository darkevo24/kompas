import logo from './logo.svg';
import './App.css';
import json from "./json-test-fe.json";
import {useDispatch,useSelector} from "react-redux"
import { add, init } from './redux/dataSlice';
import { useEffect ,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tanggal,setTanggal] = useState("");
  const [nama,setNama] = useState("");
  const [harga,setHarga] = useState("");
  const [jam,setJam] = useState("");

const dispatch = useDispatch();
const list = useSelector(function(state){
  return state.data.list;
})
 const [total,setTotal] = useState(0);

useEffect(function(){
  dispatch(init(json.detail));
},[]);

useEffect(function(){
  list.map(function(data){
    setTotal(total + parseInt(data.pengeluaraan));  
  })
},[list]);

function Batal(){
  document.getElementById("entri").classList.add("hidden");
}

function Kirim(){
  if (tanggal == "" || nama == "" || harga == "" || jam == ""){
    toast.error("input harus diisi !")
  }
  else {
  setHarga("");
  setTanggal("");
  setJam("");
  setNama("");

  dispatch(add({
    tanggal : tanggal,
    nama : nama,
    harga : harga,
    jam : jam
  }))
  document.getElementById("entri").classList.add("hidden");
  toast.success("data berhasil ditambahkan!")
}
}

function TambahItem(){
  document.getElementById("entri").classList.remove("hidden");
}
  return (
    <div className=" text-sm p-2">
      <ToastContainer />
      <p className='text-center text-xl mt-2'>Diari Jajan Februari 2021</p>
      <p className=' text-center'>Pengeluaran Bulan Ini Rp  {total}</p>
      <div className=' flex justify-center'>
      <button onClick={TambahItem} className=' mt-1 bg-blue-700 text-white p-2 rounded-lg cursor-pointer hover:opacity-80'>TAMBAH ITEM</button>
      </div>
      <div className='lg:grid grid-cols-4 gap-5 mt-3'>
        {list.map(function(data){
          return (
            <div className=' border-2 border-gray-500 p-3 mt-3 lg:mt-0'>
              <p className=' font-bold'>{data.tanggal}</p>
              <div className=' border-2 border-gray-300 flex p-1 relative mt-1'>
                <p>{data.jam}</p>
                <p className=' ml-3'>{data.nama}</p>
                <p className='absolute right-0 mr-1'>Rp. {data.pengeluaraan}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div id="entri" style={{ transform: 'translate(-50%, -50%)' }} className='hidden p-2 bg-gray-100 border-2 border-gray-500 w-96 fixed top-1/2 left-1/2'>
        <p className=' text-lg font-bold'>Tambah Entri</p>
        <p className='mt-2'>Tanggal</p>
        <input value={tanggal} onChange={function(e){setTanggal(e.target.value)}} className='border-2 w-full border-gray-300 px-2 py-1' placeholder='input Tanggal disini ...'></input>
        <p>Nama</p>
        <input value={nama} onChange={function(e){setNama(e.target.value)}} className='border-2 w-full border-gray-300 px-2 py-1' placeholder='input Nama disini ...'></input>
        <p>Harga</p>
        <input value={harga} onChange={function(e){setHarga(e.target.value)}} className='border-2 w-full border-gray-300 px-2 py-1' type="number" placeholder='input Harga disini ...'></input>
        <p>Jam</p>
        <input value={jam} onChange={function(e){setJam(e.target.value)}} className='border-2 w-full border-gray-300 px-2 py-1' type="number" placeholder='input Jam disini ...'></input>
        <div className=' flex items-center justify-end mt-2'>
        <button onClick={Batal} className='mr-4 mt-1 bg-gray-400 text-white p-2 rounded-lg cursor-pointer hover:opacity-80'>BATAL</button>
        <button onClick={Kirim} className=' mt-1 bg-blue-700 text-white p-2 rounded-lg cursor-pointer hover:opacity-80'>KIRIM</button>
        </div>
      </div>
    </div>
  );
}

export default App;
