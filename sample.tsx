import { Title, Table } from "../../../components/UI";
import Syntax from "../../../components/Syntax/Syntax";
export const FlutterSdk = () => {
  return (
    <>
      {" "}
      <Syntax
        language="javascript"
        code={`import { FlutterSdk } from "./FlutterSdk";`}
      />{" "}
      <Title>Flutter sdk</Title>{" "}
      <Table textAlign="center">
        {" "}
        <thead>
          {" "}
          <tr>
            {" "}
            <th>Column 1</th> <th>Column 2</th> <th>Column 3</th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          <tr>
            {" "}
            <td>Row 1, Col 1</td> <td>Row 1, Col 2</td> <td>Row 1, Col 3</td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <td>Row 2, Col 1</td> <td>Row 2, Col 2</td> <td>Row 2, Col 3</td>{" "}
          </tr>{" "}
        </tbody>{" "}
      </Table>{" "}
    </>
  );
};
