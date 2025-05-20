import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./hooks/UseAxiosSecure";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllFruits = () => {
  let axiosSecure = UseAxiosSecure();
  const { data: fruits = [], isLoading, refetch } = useQuery({
    queryKey: ['fruits'],
    queryFn: async () => {
      let { data } = await axiosSecure.get('/fruits');
      return data;
    }
  })


  let handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/fruits/${id}`)
        console.log(data)
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="hidden lg:flex">
                #
              </th>
              <th>Name</th>
              <th className="hidden lg:flex">price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}



            {
              fruits.map((fruit, index) => <tr>
                <th className="hidden lg:flex">
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={fruit.img}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{fruit.name}</div>
                      <p>{fruit.description}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden lg:flex">
                  {fruit.price}
                </td>
                <td >
                  <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 items-center">
                    <button onClick={() => handleDelete(fruit._id)} className="btn ">Delete</button>
                  <Link to={`/dashboard/update-fruit/${fruit._id}`} className="btn ml-2">Update</Link>
                  </div>
                </td>


              </tr>)
            }


          </tbody>
          {/* foot */}
       
        </table>
      </div>
    </div>
  );
};

export default AllFruits;