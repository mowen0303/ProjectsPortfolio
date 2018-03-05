##Supplier
CREATE OR REPLACE TYPE supplier_t AS OBJECT (supplier_id int(6), name varchar(20), MEMBER FUNCTION getSupplierInfo RETURN varchar2);

CREATE OR REPLACE TYPE BODY supplier_t AS 
MEMBER FUNCTION getSupplierInfo RETURN varchar2 is begin
return self.supplier_id || ' ' || self.name;
end;
end;

CREATE TABLE supplier OF supplier_t (supplier_id PRIMARY KEY);

INSERT INTO supplier VALUES('01','Victer Inc');
INSERT INTO supplier VALUES('02','Univers Co');
INSERT INTO supplier VALUES('03','Logi Inc');
INSERT INTO supplier VALUES('04','Canand Inc');


##Item
CREATE OR REPLACE TYPE item_t AS OBJECT (item_id int(6), item_name varchar(20), item_price number(8,2),supplier_id ref supplier_t, MEMBER FUNCTION getItemInfo RETURN varchar2);

CREATE OR REPLACE TYPE BODY item_t AS 
MEMBER FUNCTION getItemInfo RETURN varchar2 is begin
return self.item_name || ' ' || self.item_price;
end;
end;

CREATE TABLE item OF item_t (item_id PRIMARY KEY);

INSERT INTO item VALUES(item_t('01','apple','10',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '01')));
INSERT INTO item VALUES(item_t('02','Mango','5.5',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '02')));
INSERT INTO item VALUES(item_t('03','Miracle fruit','8.6',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '01')));
INSERT INTO item VALUES(item_t('04','Nance','10.6',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '03')));
INSERT INTO item VALUES(item_t('05','Coconut','100.5',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '04')));
INSERT INTO item VALUES(item_t('06','Plum','40.5',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '04')));
INSERT INTO item VALUES(item_t('07','Lychee','44.5',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '01')));
INSERT INTO item VALUES(item_t('08','Salak','213.15',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '03')));
INSERT INTO item VALUES(item_t('09','Kiwifruit','18.9',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '03')));
INSERT INTO item VALUES(item_t('10','Yuzu','810.50',(SELECT REF(s) FROM supplier s WHERE s.supplier_id = '03')));

SELECT i.item_id,i.item_name,i.item_price,i.supplier_id.name FROM item i ORDER BY i.item_price;
SELECT i.getItemInfo() FROM item i ORDER BY i.item_price;