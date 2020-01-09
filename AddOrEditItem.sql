CREATE DEFINER=`root`@`localhost` PROCEDURE `AddOrEditItem`(
IN _id INT,
IN _name varchar(40),
IN _qty int(6),
IN _amount int(6)
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO inventory.items(name,qty,amount) VALUES (_name,_qty,_amount);
        SET _id = LAST_INSERT_ID();
	ELSE
		UPDATE items
        SET
        name = _name,
        qty = _qty,
        amount = _amount
        WHERE id = _id;
	END IF;
    
    SELECT _id AS 'ID';
END