export default function List() {
  return (
    <>
      {/* <style>
        {
        `li:not(:first-of-type) {
          display: none;
        }
        `}
      </style> */}
      <ul>
        <li>№ТС</li>
        <li>
          <label htmlFor=''>
            <input type='checkbox' name='' id='' />1
          </label>
        </li>
        <li>
          <label htmlFor=''>
            <input type='checkbox' name='' id='' />2
          </label>
        </li>
        <li>
          <label htmlFor=''>
            <input type='checkbox' name='' id='' />3
          </label>
        </li>
      </ul>
    </>
  );
}
