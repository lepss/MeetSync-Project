import PropTypes from "prop-types"
const TableRowUser = ({
    userId,
    firstname,
    lastname,
    username,
    email,
    role,
    phone
}) => {
    return(
        <>
            <tr>
                <td>{userId}</td>
                <td>{firstname}</td>
                <td>{lastname}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{role}</td>
            </tr>
        </>
    )
}

TableRowUser.propTypes = {
    userId: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    phone: PropTypes.string,
}

export default TableRowUser
