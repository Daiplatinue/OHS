import MyFloatingDock from '../Styles/MyFloatingDock';

function Admin_Transactions() {
  return (
    <div>
      {/* Floating Dock - Now at the top */}
      <div className="sticky z-40 flex">
        <MyFloatingDock />
      </div>

      Admin Transactions

    </div>
  )
}

export default Admin_Transactions