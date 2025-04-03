import { Company } from "../types"

type CompanyDetailsProps ={
    company: Company; // Define el tipo de la prop
}
const CompanyDetails = ({company}:CompanyDetailsProps) => {
  return (
    <tr>
        <td className="p-3 text-lg text-gray-800">
            {company.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {company.address}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {company.email}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {company.credits}
        </td>
    </tr>
  )
}


export default CompanyDetails
