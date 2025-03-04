export default function TableUi({ tableHeader }) {
  return (
    <table class="w-full text-left table-auto min-w-max text-slate-800">
      <thead>
        <tr class="text-slate-500 border-b border-slate-300 bg-slate-50">
          {tableHeader.map((item) => (
            <th class="p-4">
              <p className="text-sm font-medium text-primary-400">
                {item.name}
              </p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-slate-50">
          <td class="p-4">
            <p class="text-sm font-bold">Project Alpha</p>
          </td>
          <td class="p-4">
            <p class="text-sm">01/01/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">30/06/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">John Michael</p>
          </td>
          <td class="p-4">
            <p class="text-sm">$50,000</p>
          </td>
          <td class="p-4">
            <a href="#" class="text-sm font-semibold ">
              Edit
            </a>
          </td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-4">
            <p class="text-sm font-bold">Beta Campaign</p>
          </td>
          <td class="p-4">
            <p class="text-sm">15/02/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">15/08/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">Alexa Liras</p>
          </td>
          <td class="p-4">
            <p class="text-sm">$75,000</p>
          </td>
          <td class="p-4">
            <a href="#" class="text-sm font-semibold ">
              Edit
            </a>
          </td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-4">
            <p class="text-sm font-bold">Campaign Delta</p>
          </td>
          <td class="p-4">
            <p class="text-sm">01/03/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">01/09/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">Laurent Perrier</p>
          </td>
          <td class="p-4">
            <p class="text-sm">$60,000</p>
          </td>
          <td class="p-4">
            <a href="#" class="text-sm font-semibold ">
              Edit
            </a>
          </td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-4">
            <p class="text-sm font-bold">Gamma Outreach</p>
          </td>
          <td class="p-4">
            <p class="text-sm">10/04/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">10/10/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">Michael Levi</p>
          </td>
          <td class="p-4">
            <p class="text-sm">$80,000</p>
          </td>
          <td class="p-4">
            <a href="#" class="text-sm font-semibold ">
              Edit
            </a>
          </td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-4">
            <p class="text-sm font-bold">Omega Strategy</p>
          </td>
          <td class="p-4">
            <p class="text-sm">01/05/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">01/11/2024</p>
          </td>
          <td class="p-4">
            <p class="text-sm">Richard Gran</p>
          </td>
          <td class="p-4">
            <p class="text-sm">$100,000</p>
          </td>
          <td class="p-4">
            <a href="#" class="text-sm font-semibold ">
              Edit
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
