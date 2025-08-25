from transformers import BertTokenizer, AutoModelForSequenceClassification
tokenizer = BertTokenizer.from_pretrained('C:/Users/Pratham/PycharmProjects/SE1_Lab/GUJARATI_BERT')
model = AutoModelForSequenceClassification.from_pretrained('C:/Users/Pratham/PycharmProjects/SE1_Lab/GUJARATI_BERT')

model.push_to_hub("KPROCKS/Model")
tokenizer.push_to_hub("KPROCKS/Model")