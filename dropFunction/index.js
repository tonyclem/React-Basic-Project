const [open, setOpen] = useState(false);

const handleOpen = () => setOpen(!open);

<div className='category-container'>
  <button className='category' onClick={handleOpen}>
    Category
  </button>
  {open ? (
    <div className='show-category'>
      <ul>
        <h5>Category</h5>
        <li>product </li>
      </ul>
    </div>
  ) : null}
</div>;
